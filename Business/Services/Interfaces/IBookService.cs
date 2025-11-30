using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.Dtos.BookDtos;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IBookService
{
    Task<IEnumerable<BookListDto>> GetList(DateTime? startDate, DateTime? endDate);
    Task<BookGetDto> GetItem(int id);
    Task<BookCreateDto> PostItem(BookCreateDto bookCreateDto);
    Task<BookGetDto?> PutItem(int id, BookUpdateDto bookUpdateDto);
}
