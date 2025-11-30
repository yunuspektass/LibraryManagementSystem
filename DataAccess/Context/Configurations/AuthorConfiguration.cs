using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LibraryManagementSystem.DataAccess.Context.Configurations;

public sealed class AuthorConfiguration : IEntityTypeConfiguration<Author>
{
    public void Configure(EntityTypeBuilder<Author> builder)
    {
        builder.HasKey(author => author.Id);

        builder.Property(author => author.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(author => author.Surname)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(author => author.Biography)
            .HasMaxLength(2000);
    }
}
