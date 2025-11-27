using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LibraryManagementSystem.DataAccess.Context.Configurations;

public sealed class BorrowRecordConfiguration : IEntityTypeConfiguration<BorrowRecord>
{
    public void Configure(EntityTypeBuilder<BorrowRecord> builder)
    {
        builder.HasKey(record => record.Id);

        builder.Property(record => record.BorrowDate)
            .HasColumnType("date");

        builder.Property(record => record.ReturnDate)
            .HasColumnType("date");

        builder.HasOne(record => record.Book)
            .WithMany(book => book.BorrowRecords)
            .HasForeignKey(record => record.BookId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(record => record.Member)
            .WithMany(member => member.BorrowRecords)
            .HasForeignKey(record => record.MemberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
