using System;
using System.Collections.Generic;

namespace LibraryManagementSystem.Business.Dtos.UserDtos;

public class UserGetDto
{
    public int Id { get; init; }
    public string UserName { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Surname { get; init; } = string.Empty;
    public string? Phone { get; init; }
    public DateTime RegistrationDate { get; init; }
    public ICollection<int> BorrowRecordIds { get; init; } = new List<int>();
}
