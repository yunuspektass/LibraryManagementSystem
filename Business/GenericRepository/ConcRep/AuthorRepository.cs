using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class AuthorRepository : BaseRepository<Author>
{
    public AuthorRepository(DbContext context) : base(context)
    {
    }
}
