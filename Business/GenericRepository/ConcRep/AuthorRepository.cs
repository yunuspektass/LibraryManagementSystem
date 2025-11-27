using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class AuthorRepository : BaseRepository<Author>, IRepository<Author>
{
    public AuthorRepository(DbContext context) : base(context)
    {
    }
}
