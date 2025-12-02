using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.Dtos.BookDtos;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IBookService
{
    Task<IEnumerable<BookListDto>> GetList(
        DateTime? startDate,
        DateTime? endDate,
        string? search = null,
        IEnumerable<int>? categoryIds = null,
        string? availability = null,
        int? yearFrom = null,
        int? yearTo = null);
    Task<BookGetDto> GetItem(int id);
    Task<BookCreateDto> PostItem(BookCreateDto bookCreateDto);
    Task<BookGetDto?> PutItem(int id, BookUpdateDto bookUpdateDto);
}
