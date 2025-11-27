using System;
using System.Collections.Generic;

namespace LibraryManagementSystem.Business.Dtos.MemberDtos;

public class MemberGetDto
{
    public int Id { get; init; }

    public string Name { get; init; } = string.Empty;

    public string Surname { get; init; } = string.Empty;

    public string Email { get; init; } = string.Empty;

    public string Phone { get; init; } = string.Empty;

    public DateTime RegistrationDate { get; init; }

    public ICollection<int> BorrowRecordIds { get; init; } = new List<int>();
}
