using System.Text;
using System.Text.Json;
using LibraryManagementSystem.Business.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace LibraryManagementSystem.Business.Services.Managers;

public class ChatBotService : IChatBotService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public ChatBotService(IConfiguration configuration, HttpClient httpClient)
    {
        _httpClient = httpClient;
        _apiKey = configuration["Gemini:ApiKey"] ?? throw new ArgumentNullException("Gemini:ApiKey");
    }

    public async Task<string> GetBookRecommendationAsync(string userMessage)
    {
        try
        {
            Console.WriteLine($"[ChatBot] Request received: {userMessage}");

            // DEBUG: List available models
            try 
            {
                var listUrl = $"https://generativelanguage.googleapis.com/v1beta/models?key={_apiKey}";
                var listResponse = await _httpClient.GetAsync(listUrl);
                var listContent = await listResponse.Content.ReadAsStringAsync();
                Console.WriteLine($"[ChatBot] Available Models: {listContent}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ChatBot] Failed to list models: {ex.Message}");
            }

            var systemPrompt = @"Sen bir kütüphane asistanısın. Kullanıcılara kitap önerileri yapıyorsun. 
                               Türkçe ve Dünya edebiyatından kitaplar önerebilirsin. 
                               Kısa, öz ve yardımcı ol. Her önerinin yanında kısa bir açıklama yap.
                               Maksimum 3-4 kitap öner. Türkçe yanıt ver.";

            var fullPrompt = $"{systemPrompt}\n\nKullanıcı sorusu: {userMessage}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = fullPrompt }
                        }
                    }
                }
            };

            var jsonContent = JsonSerializer.Serialize(requestBody);
            Console.WriteLine($"[ChatBot] Request body: {jsonContent}");
            
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            // Gemini API endpoint - gemini-2.0-flash (NEW!)
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={_apiKey}";
            Console.WriteLine($"[ChatBot] Calling Gemini API (gemini-2.0-flash)...");
            
            var response = await _httpClient.PostAsync(url, content);
            
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"[ChatBot] Gemini API Error: {response.StatusCode} - {errorContent}");
                return $"API Hatası ({response.StatusCode}): {errorContent.Substring(0, Math.Min(200, errorContent.Length))}";
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonDocument = JsonDocument.Parse(responseContent);
            
            if (jsonDocument.RootElement.TryGetProperty("candidates", out var candidates) &&
                candidates.GetArrayLength() > 0)
            {
                var message = candidates[0]
                    .GetProperty("content")
                    .GetProperty("parts")[0]
                    .GetProperty("text")
                    .GetString();

                return message ?? "Üzgünüm, şu anda bir öneri yapamıyorum.";
            }

            return "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.";
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ChatBot] Exception: {ex.GetType().Name} - {ex.Message}");
            Console.WriteLine($"[ChatBot] StackTrace: {ex.StackTrace}");
            return $"Hata: {ex.Message}";
        }
    }
}

