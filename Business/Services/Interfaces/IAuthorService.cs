using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IAuthorService
{
    Task<ServiceResult<IReadOnlyCollection<Author>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ServiceResult<Author>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ServiceResult<Author>> CreateAsync(Author author, CancellationToken cancellationToken = default);
    Task<ServiceResult<Author>> UpdateAsync(Author author, CancellationToken cancellationToken = default);
    Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
