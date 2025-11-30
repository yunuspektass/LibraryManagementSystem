using System.Collections.Generic;

namespace LibraryManagementSystem.Business.Dtos.CategoryDtos;

public class CategoryGetDto
{
    public int Id { get; init; }

    public string Name { get; init; } = string.Empty;

    public string? Description { get; init; }

    public ICollection<int> BookIds { get; init; } = new List<int>();
}
