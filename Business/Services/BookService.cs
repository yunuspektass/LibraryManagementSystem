using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services;

public class BookService : IBookService
{
    private readonly BookRepository _bookRepository;

    public BookService(BookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    public async Task<ServiceResult<Book>> CreateAsync(Book book, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(book.Title))
        {
            return ServiceResult<Book>.Fail("Kitap ba?l??? zorunludur.");
        }

        if (string.IsNullOrWhiteSpace(book.ISBN))
        {
            return ServiceResult<Book>.Fail("ISBN zorunludur.");
        }

        book.IsAvailable = true;
        var created = await _bookRepository.AddAsync(book, cancellationToken);
        return ServiceResult<Book>.Ok(created, "Kitap eklendi.");
    }

    public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _bookRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult.Fail("Kitap bulunamad?.");
        }

        await _bookRepository.DeleteAsync(existing, cancellationToken);
        return ServiceResult.Ok("Kitap silindi.");
    }

    public async Task<ServiceResult<IReadOnlyCollection<Book>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var books = await _bookRepository.GetAllAsync(cancellationToken);
        return ServiceResult<IReadOnlyCollection<Book>>.Ok(books);
    }

    public async Task<ServiceResult<IReadOnlyCollection<Book>>> GetAvailableAsync(CancellationToken cancellationToken = default)
    {
        var books = await _bookRepository.GetAvailableBooksAsync(cancellationToken);
        return ServiceResult<IReadOnlyCollection<Book>>.Ok(books);
    }

    public async Task<ServiceResult<Book>> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var book = await _bookRepository.GetWithDetailsAsync(id, cancellationToken);
        return book is null
            ? ServiceResult<Book>.Fail("Kitap bulunamad?.")
            : ServiceResult<Book>.Ok(book);
    }

    public async Task<ServiceResult<Book>> UpdateAsync(Book book, CancellationToken cancellationToken = default)
    {
        var existing = await _bookRepository.GetByIdAsync(book.Id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult<Book>.Fail("Kitap bulunamad?.");
        }

        existing.Title = book.Title;
        existing.AuthorId = book.AuthorId;
        existing.CategoryId = book.CategoryId;
        existing.ISBN = book.ISBN;
        existing.PublishDate = book.PublishDate;
        existing.IsAvailable = book.IsAvailable;

        await _bookRepository.UpdateAsync(existing, cancellationToken);
        return ServiceResult<Book>.Ok(existing, "Kitap g?ncellendi.");
    }
}
