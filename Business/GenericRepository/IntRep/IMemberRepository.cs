using System.Threading;
using System.Threading.Tasks;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.GenericRepository.IntRep;

public interface IMemberRepository : IRepository<Member>
{
    Task<Member?> GetWithBorrowHistoryAsync(int id, CancellationToken cancellationToken = default);
}
