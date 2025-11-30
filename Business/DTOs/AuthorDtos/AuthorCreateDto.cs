using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Business.Dtos.AuthorDtos;

public class AuthorCreateDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Surname { get; set; } = string.Empty;

    public DateTime? BirthDate { get; set; }

    public string? Biography { get; set; }
}
