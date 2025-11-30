using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Business.Dtos.CategoryDtos;

public class CategoryCreateDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }
}
