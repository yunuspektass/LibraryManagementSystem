using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Business.Dtos.NotificationDtos;

public class NotificationUpdateDto
{
    [Required]
    public bool IsRead { get; set; }
}
