using AutoMapper;
using LibraryManagementSystem.Business.Dtos.NotificationDtos;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Managers;

public class NotificationManager : INotificationService
{
    private readonly NotificationRepository _notificationRepository;
    private readonly IMapper _mapper;

    public NotificationManager(NotificationRepository notificationRepository, IMapper mapper)
    {
        _notificationRepository = notificationRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<NotificationListDto>> GetForUserAsync(int userId, CancellationToken cancellationToken = default)
    {
        var all = await _notificationRepository.GetAllAsync(cancellationToken);
        var filtered = all.Where(n => n.UserId == userId).OrderByDescending(n => n.CreatedAtUtc);
        return _mapper.Map<IEnumerable<NotificationListDto>>(filtered);
    }

    public async Task MarkAsReadAsync(int id, int userId, CancellationToken cancellationToken = default)
    {
        var list = await _notificationRepository.GetAllAsync(cancellationToken);
        var notification = list.FirstOrDefault(n => n.Id == id && n.UserId == userId);
        if (notification == null) return;

        notification.IsRead = true;
        await _notificationRepository.UpdateAsync(notification, cancellationToken);
    }

    public async Task CreateForUsersAsync(string title, string content, IEnumerable<int> userIds, CancellationToken cancellationToken = default)
    {
        var notifications = userIds.Select(uid => new Notification
        {
            UserId = uid,
            Title = title,
            Content = content,
            CreatedAtUtc = DateTime.UtcNow
        }).ToList();

        foreach (var n in notifications)
        {
            await _notificationRepository.AddAsync(n, cancellationToken);
        }
    }

    public async Task CreateForUserAsync(string title, string content, int userId, CancellationToken cancellationToken = default)
    {
        var notification = new Notification
        {
            UserId = userId,
            Title = title,
            Content = content,
            CreatedAtUtc = DateTime.UtcNow
        };
        await _notificationRepository.AddAsync(notification, cancellationToken);
    }
}
