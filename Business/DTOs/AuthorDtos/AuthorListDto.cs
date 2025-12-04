using System;

namespace LibraryManagementSystem.Business.Dtos.AuthorDtos;

public class AuthorListDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Surname { get; init; } = string.Empty;
    public DateTime? BirthDate { get; init; }
}

