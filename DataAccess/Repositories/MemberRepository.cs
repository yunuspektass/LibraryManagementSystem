using System.Threading;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.DataAccess.Context;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.DataAccess.Repositories;

public class MemberRepository : BaseRepository<Member>, IMemberRepository
{
    public MemberRepository(LibraryContext context) : base(context)
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
