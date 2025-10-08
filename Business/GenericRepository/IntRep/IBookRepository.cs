using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.GenericRepository.IntRep;

public interface IBookRepository : IRepository<Book>
{
    Task<IReadOnlyCollection<Book>> GetAvailableBooksAsync(CancellationToken cancellationToken = default);
    Task<Book?> GetWithDetailsAsync(int id, CancellationToken cancellationToken = default);
}
