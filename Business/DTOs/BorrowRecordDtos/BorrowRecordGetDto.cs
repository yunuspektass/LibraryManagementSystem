using System;

namespace LibraryManagementSystem.Business.Dtos.BorrowRecordDtos;

public class BorrowRecordGetDto
{
    public int Id { get; init; }

    public int BookId { get; init; }

    public int MemberId { get; init; }

    public DateTime BorrowDate { get; init; }

    public DateTime? ReturnDate { get; init; }

    public bool IsReturned { get; init; }
}
