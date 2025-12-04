using LibraryManagementSystem.DataAccess.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace LibraryManagementSystem.DataAccess.Context;

public class LibraryContextFactory : IDesignTimeDbContextFactory<LibraryContext>
{
    public LibraryContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<LibraryContext>();
        optionsBuilder.UseSqlServer("Server=localhost;Database=LibraryDB;Integrated Security=true;TrustServerCertificate=True");

        return new LibraryContext(optionsBuilder.Options);
    }
}
