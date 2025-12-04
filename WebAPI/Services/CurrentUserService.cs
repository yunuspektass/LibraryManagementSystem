using System.Security.Claims;
using LibraryManagementSystem.Core.Observability;
using LibraryManagementSystem.Core.Services.Interfaces;

namespace LibraryManagementSystem.WebAPI.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? UserId => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

    public string? UserName =>
        _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated == true
            ? _httpContextAccessor.HttpContext.User.Identity?.Name
            : null;

    public string CorrelationId =>
        _httpContextAccessor.HttpContext?.Items[CorrelationConstants.ItemKey]?.ToString()
        ?? _httpContextAccessor.HttpContext?.TraceIdentifier
        ?? Guid.NewGuid().ToString();
}
