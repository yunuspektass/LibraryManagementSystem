using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.Dtos.CategoryDtos;

namespace LibraryManagementSystem.Business.Services.Interfaces.Category;

public interface ICategoryService
{
    Task<IEnumerable<CategoryListDto>> GetList(DateTime? startDate, DateTime? endDate);
    Task<CategoryGetDto> GetItem(int id);
    Task<CategoryCreateDto> PostItem(CategoryCreateDto categoryCreateDto);
    Task<CategoryGetDto?> PutItem(int id, CategoryUpdateDto categoryUpdateDto);
}

