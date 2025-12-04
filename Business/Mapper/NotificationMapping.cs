using AutoMapper;
using LibraryManagementSystem.Business.Dtos.NotificationDtos;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Mapper;

public class NotificationMapping : Profile
{
    public NotificationMapping()
    {
        CreateMap<Notification, NotificationListDto>().ReverseMap();
    }
}
