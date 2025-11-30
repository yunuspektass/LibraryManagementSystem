using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.Dtos.UserDtos;

namespace LibraryManagementSystem.Business.Services.Interfaces.User;

public interface IUserService
{
    Task<IEnumerable<UserListDto>> GetList(DateTime? startDate, DateTime? endDate);
    Task<UserGetDto> GetItem(int id);
    Task<UserCreateDto> PostItem(UserCreateDto userCreateDto);
    Task<UserGetDto?> PutItem(int id, UserUpdateDto userUpdateDto);
}

