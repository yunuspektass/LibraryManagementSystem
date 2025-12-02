using LibraryManagementSystem.Business.Dtos.AnnouncementDtos;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IAnnouncementService
{
    Task<IEnumerable<AnnouncementListDto>> GetList(CancellationToken cancellationToken = default);
    Task<AnnouncementListDto> CreateAsync(AnnouncementCreateDto dto, string? userId, CancellationToken cancellationToken = default);
}
