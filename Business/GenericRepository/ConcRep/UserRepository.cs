using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.ConcRep;

public class UserRepository
{
    private readonly IdentityDbContext<User, IdentityRole<int>, int> _context;

    public UserRepository(IdentityDbContext<User, IdentityRole<int>, int> context)
    {
        _context = context;
    }

    public async Task<IReadOnlyCollection<User>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .FindAsync(new object?[] { id }, cancellationToken);
    }

    public async Task<User?> GetWithBorrowHistoryAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .Include(user => user.BorrowRecords)
            .ThenInclude(record => record.Book)
            .FirstOrDefaultAsync(user => user.Id == id, cancellationToken);
    }

    public async Task<List<int>> GetAllUserIdsAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .Select(u => u.Id)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<int>> GetUserIdsByRoleAsync(string roleName, CancellationToken cancellationToken = default)
    {
        var role = await _context.Roles.AsNoTracking().FirstOrDefaultAsync(r => r.Name == roleName, cancellationToken);
        if (role == null)
            return new List<int>();

        var userIds = await _context.UserRoles
            .AsNoTracking()
            .Where(ur => ur.RoleId == role.Id)
            .Select(ur => ur.UserId)
            .ToListAsync(cancellationToken);

        return userIds;
    }
}
