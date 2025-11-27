using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.DataAccess.Context;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.DataAccess.Repositories;

public class BookRepository : BaseRepository<Book>, IBookRepository
{
    public BookRepository(LibraryContext context) : base(context)
    {
    }

    public async Task<IReadOnlyCollection<Book>> GetAvailableBooksAsync(CancellationToken cancellationToken = default)
    {
        var books = await DbSet.AsNoTracking()
            .Where(book => book.IsAvailable)
            .Include(book => book.Author)
            .Include(book => book.Category)
            .ToListAsync(cancellationToken);

        return books;
    }

    public async Task<Book?> GetWithDetailsAsync(int id, CancellationToken cancellationToken = default)
    {
        return await DbSet.AsNoTracking()
            .Include(book => book.Author)
            .Include(book => book.Category)
            .Include(book => book.BorrowRecords)
            .FirstOrDefaultAsync(book => book.Id == id, cancellationToken);
    }
}
