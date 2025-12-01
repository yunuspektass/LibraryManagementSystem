using LibraryManagementSystem.Business.Dtos.UserDtos;
using LibraryManagementSystem.Business.Services.Interfaces.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserListDto>>> GetList([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var users = await _userService.GetList(startDate, endDate);
        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserGetDto>> GetItem(int id)
    {
        try
        {
            var user = await _userService.GetItem(id);
            return Ok(user);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<UserCreateDto>> PostItem(UserCreateDto userCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdUser = await _userService.PostItem(userCreateDto);
        return Ok(createdUser);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<UserGetDto>> PutItem(int id, UserUpdateDto userUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _userService.PutItem(id, userUpdateDto);
        if (result == null)
            return NotFound();

        return Ok(result);
    }
}

