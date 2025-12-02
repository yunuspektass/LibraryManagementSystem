using System;

namespace LibraryManagementSystem.Business.Dtos.BookDtos;

public class BookListDto
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string ISBN { get; init; } = string.Empty;
    public DateTime? PublishDate { get; init; }
    public bool IsAvailable { get; init; }
    public string? AuthorName { get; init; }
    public string? CategoryName { get; init; }
    public int AvailableCopies { get; init; }
    public int? PublicationYear { get; init; }
    public DateTime CreatedAt { get; init; }
}
