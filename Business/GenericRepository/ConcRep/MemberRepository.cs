using System.Threading;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class MemberRepository : BaseRepository<Member>, IRepository<Member>
{
    public MemberRepository(DbContext context) : base(context)
    {
    }

    public async Task<Member?> GetWithBorrowHistoryAsync(int id, CancellationToken cancellationToken = default)
    {
        return await DbSet.AsNoTracking()
            .Include(member => member.BorrowRecords)
            .ThenInclude(record => record.Book)
            .FirstOrDefaultAsync(member => member.Id == id, cancellationToken);
    }
}
