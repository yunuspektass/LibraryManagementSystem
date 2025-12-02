using LibraryManagementSystem.Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChatBotController : ControllerBase
{
    private readonly IChatBotService _chatBotService;

    public ChatBotController(IChatBotService chatBotService)
    {
        _chatBotService = chatBotService;
    }

    [HttpPost("recommend")]
    public async Task<ActionResult<string>> GetRecommendation([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new { message = "Mesaj boş olamaz." });
        }

        var response = await _chatBotService.GetBookRecommendationAsync(request.Message);
        return Ok(new { message = response });
    }
}

public class ChatRequest
{
    public string Message { get; set; } = string.Empty;
}

