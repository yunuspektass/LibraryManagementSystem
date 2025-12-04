using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Business.Dtos.CategoryDtos;

public class CategoryUpdateDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }
}
