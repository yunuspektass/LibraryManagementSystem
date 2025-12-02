using AutoMapper;
using LibraryManagementSystem.Business.Dtos.AnnouncementDtos;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Managers;

public class AnnouncementManager : IAnnouncementService
{
    private readonly AnnouncementRepository _announcementRepository;
    private readonly NotificationRepository _notificationRepository;
    private readonly UserRepository _userRepository;
    private readonly IMapper _mapper;

    public AnnouncementManager(
        AnnouncementRepository announcementRepository,
        NotificationRepository notificationRepository,
        UserRepository userRepository,
        IMapper mapper)
    {
        _announcementRepository = announcementRepository;
        _notificationRepository = notificationRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AnnouncementListDto>> GetList(CancellationToken cancellationToken = default)
    {
        var list = await _announcementRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<IEnumerable<AnnouncementListDto>>(list.OrderByDescending(a => a.PublishedAt));
    }

    public async Task<AnnouncementListDto> CreateAsync(AnnouncementCreateDto dto, string? userId, CancellationToken cancellationToken = default)
    {
        var entity = _mapper.Map<Announcement>(dto);
        entity.PublishedAt = DateTime.UtcNow;
        entity.PublishedBy = userId;

        var created = await _announcementRepository.AddAsync(entity, cancellationToken);

        // Bildirim oluştur
        var userIds = await _userRepository.GetAllUserIdsAsync(cancellationToken);
        var notifications = userIds.Select(uid => new Notification
        {
            UserId = uid,
            Title = dto.Title,
            Content = dto.Content,
            CreatedAtUtc = DateTime.UtcNow
        }).ToList();

        if (notifications.Count > 0)
        {
            foreach (var notification in notifications)
            {
                await _notificationRepository.AddAsync(notification, cancellationToken);
            }
        }

        return _mapper.Map<AnnouncementListDto>(created);
    }
}
