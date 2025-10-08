using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Interfaces;

public interface IMemberService
{
    Task<ServiceResult<IReadOnlyCollection<Member>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ServiceResult<Member>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ServiceResult<Member>> CreateAsync(Member member, CancellationToken cancellationToken = default);
    Task<ServiceResult<Member>> UpdateAsync(Member member, CancellationToken cancellationToken = default);
    Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<ServiceResult<Member>> GetWithBorrowHistoryAsync(int id, CancellationToken cancellationToken = default);
}
