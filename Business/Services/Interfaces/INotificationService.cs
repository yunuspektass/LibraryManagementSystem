using LibraryManagementSystem.Business.Dtos.NotificationDtos;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface INotificationService
{
    Task<IEnumerable<NotificationListDto>> GetForUserAsync(int userId, CancellationToken cancellationToken = default);
    Task MarkAsReadAsync(int id, int userId, CancellationToken cancellationToken = default);
    Task CreateForUsersAsync(string title, string content, IEnumerable<int> userIds, CancellationToken cancellationToken = default);
    Task CreateForUserAsync(string title, string content, int userId, CancellationToken cancellationToken = default);
}
