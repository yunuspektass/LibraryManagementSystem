using LibraryManagementSystem.Business.Dtos.Auth;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Core.Security;
using LibraryManagementSystem.Core.Services.Interfaces;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using IdentityUserManager = Microsoft.AspNetCore.Identity.UserManager<LibraryManagementSystem.Domain.Entities.User>;

namespace LibraryManagementSystem.Business.Services.Managers;

public class AuthManager : IAuthService
{
    private readonly IdentityUserManager _userManager;
    private readonly RoleManager<IdentityRole<int>> _roleManager;
    private readonly IJwtService _jwtService;

    public AuthManager(IdentityUserManager userManager, RoleManager<IdentityRole<int>> roleManager, IJwtService jwtService)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _jwtService = jwtService;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);

        if (existingUser != null)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "User with this email already exists."
            };
        }

        var user = new Domain.Entities.User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = string.Join(", ", result.Errors.Select(e => e.Description))
            };
        }

        // Ensure User role exists (safety check)
        if (!await _roleManager.RoleExistsAsync(Roles.User))
        {
            await _roleManager.CreateAsync(new IdentityRole<int>(Roles.User));
        }

        await _userManager.AddToRoleAsync(user, Roles.User);

        var accessToken = _jwtService.GenerateAccessToken(user.Id, user.Email!, Roles.User);
        var refreshToken = _jwtService.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await _userManager.UpdateAsync(user);

        return new AuthResponseDto
        {
            IsSuccess = true,
            Message = "User created successfully.",
            Data = new AuthDataDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60)
            }
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid email or password."
            };
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!isPasswordValid)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid email or password."
            };
        }

        var roles = await _userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault() ?? Roles.User;

        var accessToken = _jwtService.GenerateAccessToken(user.Id, user.Email!, role);
        var refreshToken = _jwtService.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await _userManager.UpdateAsync(user);

        return new AuthResponseDto
        {
            IsSuccess = true,
            Message = "Login successful.",
            Data = new AuthDataDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60)
            }
        };
    }

    public async Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenDto refreshTokenDto)
    {
        var principal = _jwtService.GetPrincipalFromExpiredToken(refreshTokenDto.AccessToken);

        if (principal == null)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid access token."
            };
        }

        var userId = int.Parse(principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
        var user = await _userManager.FindByIdAsync(userId.ToString());

        if (user == null || user.RefreshToken != refreshTokenDto.RefreshToken || 
            user.RefreshTokenExpiry <= DateTime.UtcNow)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid refresh token."
            };
        }

        var roles = await _userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault() ?? Roles.User;

        var newAccessToken = _jwtService.GenerateAccessToken(user.Id, user.Email!, role);
        var newRefreshToken = _jwtService.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await _userManager.UpdateAsync(user);

        return new AuthResponseDto
        {
            IsSuccess = true,
            Message = "Token refreshed successfully.",
            Data = new AuthDataDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60)
            }
        };
    }
}

