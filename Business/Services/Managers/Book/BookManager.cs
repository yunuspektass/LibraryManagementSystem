using AutoMapper;
using LibraryManagementSystem.Business.Dtos.BookDtos;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Managers.Book;

public class BookManager : IBookService
{
    private readonly BookRepository _bookRepository;
    private readonly IMapper _mapper;

    public BookManager(BookRepository bookRepository, IMapper mapper)
    {
        _bookRepository = bookRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<BookListDto>> GetList(
        DateTime? startDate,
        DateTime? endDate,
        string? search = null,
        IEnumerable<int>? categoryIds = null,
        string? availability = null,
        int? yearFrom = null,
        int? yearTo = null)
    {
        var books = await _bookRepository.GetFilteredAsync(search, categoryIds, availability, yearFrom, yearTo);
        return _mapper.Map<IEnumerable<BookListDto>>(books);
    }

    public async Task<BookGetDto> GetItem(int id)
    {
        var book = await _bookRepository.GetWithDetailsAsync(id);
        if (book == null)
            throw new ArgumentException($"Book with id {id} not found");

        return _mapper.Map<BookGetDto>(book);
    }

    public async Task<BookCreateDto> PostItem(BookCreateDto bookCreateDto)
    {
        var book = _mapper.Map<Domain.Entities.Book>(bookCreateDto);
        await _bookRepository.AddAsync(book);
        return _mapper.Map<BookCreateDto>(book);
    }

    public async Task<BookGetDto?> PutItem(int id, BookUpdateDto bookUpdateDto)
    {
        var book = await _bookRepository.GetByIdAsync(id);
        if (book == null)
            return null;

        _mapper.Map(bookUpdateDto, book);
        await _bookRepository.UpdateAsync(book);
        return _mapper.Map<BookGetDto>(book);
    }
}
