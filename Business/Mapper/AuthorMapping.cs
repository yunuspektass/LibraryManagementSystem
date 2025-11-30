using AutoMapper;
using LibraryManagementSystem.Business.Dtos.AuthorDtos;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Mapper;

public class AuthorMapping : Profile
{
    public AuthorMapping()
    {
        CreateMap<Author, AuthorGetDto>().ReverseMap();
        CreateMap<Author, AuthorCreateDto>().ReverseMap();
        CreateMap<Author, AuthorUpdateDto>().ReverseMap();
        CreateMap<Author, AuthorListDto>().ReverseMap();
    }
}

