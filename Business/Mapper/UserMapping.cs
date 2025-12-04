using System.Linq;
using AutoMapper;
using LibraryManagementSystem.Business.Dtos.UserDtos;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Mapper;

public class UserMapping : Profile
{
    public UserMapping()
    {
        CreateMap<User, UserGetDto>()
            .ForMember(dest => dest.BorrowRecordIds, opt => opt.MapFrom(src => src.BorrowRecords.Select(br => br.Id)));
        CreateMap<UserGetDto, User>()
            .ForMember(dest => dest.BorrowRecords, opt => opt.Ignore())
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.SecurityStamp, opt => opt.Ignore())
            .ForMember(dest => dest.ConcurrencyStamp, opt => opt.Ignore());
        
        CreateMap<User, UserCreateDto>()
            .ForMember(dest => dest.Password, opt => opt.Ignore());
        CreateMap<UserCreateDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.SecurityStamp, opt => opt.Ignore())
            .ForMember(dest => dest.ConcurrencyStamp, opt => opt.Ignore())
            .ForMember(dest => dest.BorrowRecords, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshToken, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshTokenExpiry, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.EmailConfirmed, opt => opt.Ignore())
            .ForMember(dest => dest.PhoneNumber, opt => opt.Ignore())
            .ForMember(dest => dest.PhoneNumberConfirmed, opt => opt.Ignore())
            .ForMember(dest => dest.TwoFactorEnabled, opt => opt.Ignore())
            .ForMember(dest => dest.LockoutEnd, opt => opt.Ignore())
            .ForMember(dest => dest.LockoutEnabled, opt => opt.Ignore())
            .ForMember(dest => dest.AccessFailedCount, opt => opt.Ignore());
        
        CreateMap<User, UserUpdateDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
        CreateMap<UserUpdateDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.SecurityStamp, opt => opt.Ignore())
            .ForMember(dest => dest.ConcurrencyStamp, opt => opt.Ignore())
            .ForMember(dest => dest.BorrowRecords, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshToken, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshTokenExpiry, opt => opt.Ignore())
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.EmailConfirmed, opt => opt.Ignore())
            .ForMember(dest => dest.PhoneNumber, opt => opt.Ignore())
            .ForMember(dest => dest.PhoneNumberConfirmed, opt => opt.Ignore())
            .ForMember(dest => dest.TwoFactorEnabled, opt => opt.Ignore())
            .ForMember(dest => dest.LockoutEnd, opt => opt.Ignore())
            .ForMember(dest => dest.LockoutEnabled, opt => opt.Ignore())
            .ForMember(dest => dest.AccessFailedCount, opt => opt.Ignore());
        
        CreateMap<User, UserListDto>().ReverseMap();
    }
}

