using System;

namespace LibraryManagementSystem.Business.Dtos.BookDtos;

public class BookListDto
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string ISBN { get; init; } = string.Empty;
    public DateTime? PublishDate { get; init; }
    public bool IsAvailable { get; init; }
}

