using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IBorrowRecordService
{
    Task<ServiceResult<IReadOnlyCollection<BorrowRecord>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ServiceResult<BorrowRecord>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ServiceResult<BorrowRecord>> CreateAsync(BorrowRecord borrowRecord, CancellationToken cancellationToken = default);
    Task<ServiceResult<BorrowRecord>> UpdateAsync(BorrowRecord borrowRecord, CancellationToken cancellationToken = default);
    Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
