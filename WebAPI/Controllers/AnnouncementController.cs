using LibraryManagementSystem.Business.Dtos.AnnouncementDtos;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Core.Security;
using LibraryManagementSystem.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Policy = "LibraryStaffPolicy")]
public class AnnouncementController : ControllerBase
{
    private readonly IAnnouncementService _announcementService;
    private readonly ICurrentUserService _currentUserService;

    public AnnouncementController(IAnnouncementService announcementService, ICurrentUserService currentUserService)
    {
        _announcementService = announcementService;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AnnouncementListDto>>> GetList(CancellationToken cancellationToken)
    {
        var list = await _announcementService.GetList(cancellationToken);
        return Ok(list);
    }

    [HttpPost]
    public async Task<ActionResult<AnnouncementListDto>> Create([FromBody] AnnouncementCreateDto dto, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _announcementService.CreateAsync(dto, _currentUserService.UserId, cancellationToken);
        return Ok(created);
    }
}
