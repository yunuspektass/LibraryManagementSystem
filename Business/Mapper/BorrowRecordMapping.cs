using AutoMapper;
using LibraryManagementSystem.Business.Dtos.BorrowRecordDtos;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Mapper;

public class BorrowRecordMapping : Profile
{
    public BorrowRecordMapping()
    {
        CreateMap<BorrowRecord, BorrowRecordGetDto>().ReverseMap();
        CreateMap<BorrowRecord, BorrowRecordCreateDto>().ReverseMap();
        CreateMap<BorrowRecord, BorrowRecordUpdateDto>().ReverseMap();
        CreateMap<BorrowRecord, BorrowRecordListDto>().ReverseMap();
    }
}

