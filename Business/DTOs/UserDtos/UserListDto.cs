using System;

namespace LibraryManagementSystem.Business.Dtos.UserDtos;

public class UserListDto
{
    public int Id { get; init; }
    public string Email { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Surname { get; init; } = string.Empty;
    public string Phone { get; init; } = string.Empty;
    public DateTime RegistrationDate { get; init; }
}

