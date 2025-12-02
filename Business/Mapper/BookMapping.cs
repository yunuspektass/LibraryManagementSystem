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
        CreateMap<Book, BookListDto>()
            .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author != null ? $"{src.Author.Name} {src.Author.Surname}" : null))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : null))
            .ForMember(dest => dest.AvailableCopies, opt => opt.MapFrom(src => src.IsAvailable ? 1 : 0))
            .ForMember(dest => dest.PublicationYear, opt => opt.MapFrom(src => src.PublishDate.HasValue ? src.PublishDate.Value.Year : (int?)null));
    }
}
