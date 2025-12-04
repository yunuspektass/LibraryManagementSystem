using LibraryManagementSystem.Business.GenericRepository.BaseRepo;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class NotificationRepository : BaseRepository<Notification>
{
    public NotificationRepository(DbContext context) : base(context)
    {
    }
}
