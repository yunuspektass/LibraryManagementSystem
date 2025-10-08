using LibraryManagementSystem.Core.Domain;

namespace LibraryManagementSystem.Domain.Entities;

public class Book : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public int AuthorId { get; set; }
    public int CategoryId { get; set; }
    public string ISBN { get; set; } = string.Empty;
    public DateTime? PublishDate { get; set; }
    public bool IsAvailable { get; set; } = true;

    public Author? Author { get; set; }
    public Category? Category { get; set; }
    public ICollection<BorrowRecord> BorrowRecords { get; set; } = new HashSet<BorrowRecord>();
}
