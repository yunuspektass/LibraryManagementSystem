using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class CategoryRepository : BaseRepository<Category>
{
    public CategoryRepository(DbContext context) : base(context)
    {
    }
}
