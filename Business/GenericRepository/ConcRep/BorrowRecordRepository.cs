using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class BorrowRecordRepository : BaseRepository<BorrowRecord>
{
    public BorrowRecordRepository(DbContext context) : base(context)
    {
    }
}
