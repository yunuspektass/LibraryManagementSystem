using LibraryManagementSystem.Core.Domain;

namespace LibraryManagementSystem.Domain.Entities;

public class BorrowRecord : BaseEntity
{
    public int BookId { get; set; }
    public int MemberId { get; set; }
    public DateTime BorrowDate { get; set; }
    public DateTime? ReturnDate { get; set; }
    public bool IsReturned { get; set; }

    public Book? Book { get; set; }
    public Member? Member { get; set; }
}
