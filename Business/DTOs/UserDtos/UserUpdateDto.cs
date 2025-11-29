using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Business.Dtos.UserDtos;

public class UserUpdateDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Surname { get; set; } = string.Empty;

    [Phone]
    public string Phone { get; set; } = string.Empty;

    public DateTime RegistrationDate { get; set; }
}

