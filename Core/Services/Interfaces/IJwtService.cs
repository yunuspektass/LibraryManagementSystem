using System.Security.Claims;

namespace LibraryManagementSystem.Core.Services.Interfaces;

public interface IJwtService
{
    string GenerateAccessToken(int userId, string email, string role);
    string GenerateRefreshToken();
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
    bool ValidateToken(string token);
    int GetUserIdFromToken(string token);
}

