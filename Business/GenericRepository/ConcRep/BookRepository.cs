using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class BookRepository : BaseRepository<Book>
{
    public BookRepository(DbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyCollection<Book>> GetFilteredAsync(
        string? search,
        IEnumerable<int>? categoryIds,
        string? availability,
        int? yearFrom,
        int? yearTo,
        CancellationToken cancellationToken = default)
    {
        var query = DbSet
            .AsNoTracking()
            .Include(book => book.Author)
            .Include(book => book.Category)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var lowered = search.ToLower();
            query = query.Where(book =>
                book.Title.ToLower().Contains(lowered) ||
                book.ISBN.ToLower().Contains(lowered) ||
                (book.Author != null && (
                    book.Author.Name.ToLower().Contains(lowered) ||
                    book.Author.Surname.ToLower().Contains(lowered))));
        }

        if (categoryIds != null && categoryIds.Any())
        {
            query = query.Where(book => categoryIds.Contains(book.CategoryId));
        }

        if (!string.IsNullOrWhiteSpace(availability))
        {
            if (availability.Equals("available", StringComparison.OrdinalIgnoreCase))
                query = query.Where(book => book.IsAvailable);
            else if (availability.Equals("borrowed", StringComparison.OrdinalIgnoreCase))
                query = query.Where(book => !book.IsAvailable);
        }

        if (yearFrom.HasValue)
        {
            query = query.Where(book => book.PublishDate.HasValue && book.PublishDate.Value.Year >= yearFrom.Value);
        }

        if (yearTo.HasValue)
        {
            query = query.Where(book => book.PublishDate.HasValue && book.PublishDate.Value.Year <= yearTo.Value);
        }

        return await query.ToListAsync(cancellationToken);
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
