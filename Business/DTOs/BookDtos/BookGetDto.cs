using System;
using System.Collections.Generic;

namespace LibraryManagementSystem.Business.Dtos.BookDtos;

public class BookGetDto
{
    public int Id { get; init; }

    public string Title { get; init; } = string.Empty;

    public int AuthorId { get; init; }

    public int CategoryId { get; init; }

    public string ISBN { get; init; } = string.Empty;

    public DateTime? PublishDate { get; init; }

    public bool IsAvailable { get; init; }

    public ICollection<int> BorrowRecordIds { get; init; } = new List<int>();
}
