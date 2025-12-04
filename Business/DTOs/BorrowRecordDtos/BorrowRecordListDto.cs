using System;

namespace LibraryManagementSystem.Business.Dtos.BorrowRecordDtos;

public class BorrowRecordListDto
{
    public int Id { get; init; }
    public int BookId { get; init; }
    public int UserId { get; init; }
    public DateTime BorrowDate { get; init; }
    public DateTime? ReturnDate { get; init; }
    public bool IsReturned { get; init; }
    public bool ReturnRequested { get; init; }
}
