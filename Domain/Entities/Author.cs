using LibraryManagementSystem.Core.Domain;

namespace LibraryManagementSystem.Domain.Entities;

public class Author : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public DateTime? BirthDate { get; set; }
    public string? Biography { get; set; }

    public ICollection<Book> Books { get; set; } = new HashSet<Book>();
}
