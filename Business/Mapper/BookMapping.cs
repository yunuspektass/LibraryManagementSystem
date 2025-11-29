using AutoMapper;
using LibraryManagementSystem.Business.Dtos.BookDtos;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Mapper;

public class BookMapping : Profile
{
    public BookMapping()
    {
        CreateMap<Book, BookGetDto>().ReverseMap();
        CreateMap<Book, BookCreateDto>().ReverseMap();
        CreateMap<Book, BookUpdateDto>().ReverseMap();
        CreateMap<Book, BookListDto>().ReverseMap();
    }
}

