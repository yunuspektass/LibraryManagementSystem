using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Business.Dtos.BookDtos;

public class BookUpdateDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public int AuthorId { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [Required]
    public string ISBN { get; set; } = string.Empty;

    public DateTime? PublishDate { get; set; }

    public bool IsAvailable { get; set; }
}
