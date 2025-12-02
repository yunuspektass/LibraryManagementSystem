using AutoMapper;
using LibraryManagementSystem.Business.Dtos.AnnouncementDtos;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Mapper;

public class AnnouncementMapping : Profile
{
    public AnnouncementMapping()
    {
        CreateMap<Announcement, AnnouncementListDto>().ReverseMap();
        CreateMap<AnnouncementCreateDto, Announcement>();
    }
}
