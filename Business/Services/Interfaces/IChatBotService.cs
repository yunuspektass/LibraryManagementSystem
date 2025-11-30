using System.Text;
using System.Text.Json;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IChatBotService
{
    Task<string> GetBookRecommendationAsync(string userMessage);
}

