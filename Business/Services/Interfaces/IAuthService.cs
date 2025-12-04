using LibraryManagementSystem.Business.Dtos.Auth;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenDto refreshTokenDto);
}

