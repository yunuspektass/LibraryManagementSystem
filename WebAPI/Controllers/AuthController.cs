using LibraryManagementSystem.Business.Dtos.Auth;
using LibraryManagementSystem.Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto registerDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid data format."
            });
        }

        var result = await _authService.RegisterAsync(registerDto);
        
        if (!result.IsSuccess)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid data format."
            });
        }

        var result = await _authService.LoginAsync(loginDto);
        
        if (!result.IsSuccess)
        {
            return Unauthorized(result);
        }

        return Ok(result);
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<AuthResponseDto>> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid data format."
            });
        }

        var result = await _authService.RefreshTokenAsync(refreshTokenDto);
        
        if (!result.IsSuccess)
        {
            return Unauthorized(result);
        }

        return Ok(result);
    }
}

