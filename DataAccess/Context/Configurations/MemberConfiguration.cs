using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LibraryManagementSystem.DataAccess.Context.Configurations;

public sealed class MemberConfiguration : IEntityTypeConfiguration<Member>
{
    public void Configure(EntityTypeBuilder<Member> builder)
    {
        builder.HasKey(member => member.Id);

        builder.Property(member => member.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(member => member.Surname)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(member => member.Email)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(member => member.Phone)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(member => member.RegistrationDate)
            .HasColumnType("date");
    }
}
