using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Business.Dtos.AnnouncementDtos;

public class AnnouncementCreateDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;
}
