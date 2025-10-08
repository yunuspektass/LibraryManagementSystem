using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IBookService
{
    Task<ServiceResult<IReadOnlyCollection<Book>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ServiceResult<IReadOnlyCollection<Book>>> GetAvailableAsync(CancellationToken cancellationToken = default);
    Task<ServiceResult<Book>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ServiceResult<Book>> CreateAsync(Book book, CancellationToken cancellationToken = default);
    Task<ServiceResult<Book>> UpdateAsync(Book book, CancellationToken cancellationToken = default);
    Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
