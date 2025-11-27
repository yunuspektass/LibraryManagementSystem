using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface ICategoryService
{
    Task<ServiceResult<IReadOnlyCollection<Category>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ServiceResult<Category>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ServiceResult<Category>> CreateAsync(Category category, CancellationToken cancellationToken = default);
    Task<ServiceResult<Category>> UpdateAsync(Category category, CancellationToken cancellationToken = default);
    Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
