using LibraryManagementSystem.Business.Dtos.NotificationDtos;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class NotificationController : ControllerBase
{
    private readonly INotificationService _notificationService;
    private readonly ICurrentUserService _currentUserService;

    public NotificationController(INotificationService notificationService, ICurrentUserService currentUserService)
    {
        _notificationService = notificationService;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NotificationListDto>>> GetMyNotifications(CancellationToken cancellationToken)
    {
        if (!int.TryParse(_currentUserService.UserId, out var userId))
            return Unauthorized();

        var list = await _notificationService.GetForUserAsync(userId, cancellationToken);
        return Ok(list);
    }

    [HttpPatch("{id:int}")]
    public async Task<IActionResult> MarkRead(int id, [FromBody] NotificationUpdateDto dto, CancellationToken cancellationToken)
    {
        if (!int.TryParse(_currentUserService.UserId, out var userId))
            return Unauthorized();

        if (!dto.IsRead)
            return BadRequest("Invalid payload");

        await _notificationService.MarkAsReadAsync(id, userId, cancellationToken);
        return NoContent();
    }
}
