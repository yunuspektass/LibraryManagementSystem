using LibraryManagementSystem.Core.Domain.Extensions;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.DataAccess.Context;

public class LibraryContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public const int DefaultStringLength = 256;

    public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
    {
    }

    public DbSet<Book> Books => Set<Book>();
    public DbSet<Author> Authors => Set<Author>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<BorrowRecord> BorrowRecords => Set<BorrowRecord>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LibraryContext).Assembly);
        modelBuilder.AddGlobalFilter();

        modelBuilder.Entity<AuditLog>(builder =>
        {
            builder.Property(x => x.EntityName)
                .IsRequired()
                .HasMaxLength(DefaultStringLength);

            builder.Property(x => x.Action)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.PerformedBy)
                .HasMaxLength(DefaultStringLength);

            builder.Property(x => x.CorrelationId)
                .HasMaxLength(DefaultStringLength);
        });
    }
}
