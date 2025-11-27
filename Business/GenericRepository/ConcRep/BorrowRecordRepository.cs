using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class BorrowRecordRepository : BaseRepository<BorrowRecord>, IRepository<BorrowRecord>
{
    public BorrowRecordRepository(DbContext context) : base(context)
    {
    }
}
