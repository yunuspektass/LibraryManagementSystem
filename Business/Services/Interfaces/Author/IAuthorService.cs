using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.Dtos.AuthorDtos;

namespace LibraryManagementSystem.Business.Services.Interfaces.Author;

public interface IAuthorService
{
    Task<IEnumerable<AuthorListDto>> GetList(DateTime? startDate, DateTime? endDate);
    Task<AuthorGetDto> GetItem(int id);
    Task<AuthorCreateDto> PostItem(AuthorCreateDto authorCreateDto);
    Task<AuthorGetDto?> PutItem(int id, AuthorUpdateDto authorUpdateDto);
}

