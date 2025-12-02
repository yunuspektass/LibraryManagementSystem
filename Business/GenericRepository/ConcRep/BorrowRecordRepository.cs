using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class BorrowRecordRepository : BaseRepository<BorrowRecord>
{
    public BorrowRecordRepository(DbContext context) : base(context)
    {
    }

    public async Task<BorrowRecord?> GetWithUserAsync(int id, CancellationToken cancellationToken = default)
    {
        return await DbSet.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
    }
}
