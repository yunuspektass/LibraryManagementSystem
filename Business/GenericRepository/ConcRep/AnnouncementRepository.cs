using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class AnnouncementRepository : BaseRepository<Announcement>
{
    public AnnouncementRepository(DbContext context) : base(context)
    {
    }
}
