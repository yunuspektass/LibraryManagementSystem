using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class CategoryRepository : BaseRepository<Category>, IRepository<Category>
{
    public CategoryRepository(DbContext context) : base(context)
    {
    }
}
