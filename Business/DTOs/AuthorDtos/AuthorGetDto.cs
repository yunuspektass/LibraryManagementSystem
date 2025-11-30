using System;
using System.Collections.Generic;

namespace LibraryManagementSystem.Business.Dtos.AuthorDtos;

public class AuthorGetDto
{
    public int Id { get; init; }

    public string Name { get; init; } = string.Empty;

    public string Surname { get; init; } = string.Empty;

    public DateTime? BirthDate { get; init; }

    public string? Biography { get; init; }

    public ICollection<int> BookIds { get; init; } = new List<int>();
}
