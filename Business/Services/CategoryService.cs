using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services;

public class CategoryService : ICategoryService
{
    private readonly IRepository<Category> _categoryRepository;

    public CategoryService(IRepository<Category> categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<ServiceResult<Category>> CreateAsync(Category category, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(category.Name))
        {
            return ServiceResult<Category>.Fail("Category name is required.");
        }

        var created = await _categoryRepository.AddAsync(category, cancellationToken);
        return ServiceResult<Category>.Ok(created, "Category created.");
    }

    public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _categoryRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult.Fail("Category not found.");
        }

        await _categoryRepository.DeleteAsync(existing, cancellationToken);
        return ServiceResult.Ok("Category deleted.");
    }

    public async Task<ServiceResult<IReadOnlyCollection<Category>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var categories = await _categoryRepository.GetAllAsync(cancellationToken);
        return ServiceResult<IReadOnlyCollection<Category>>.Ok(categories);
    }

    public async Task<ServiceResult<Category>> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var category = await _categoryRepository.GetByIdAsync(id, cancellationToken);
        return category is null
            ? ServiceResult<Category>.Fail("Category not found.")
            : ServiceResult<Category>.Ok(category);
    }

    public async Task<ServiceResult<Category>> UpdateAsync(Category category, CancellationToken cancellationToken = default)
    {
        var existing = await _categoryRepository.GetByIdAsync(category.Id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult<Category>.Fail("Category not found.");
        }

        existing.Name = category.Name;
        existing.Description = category.Description;

        await _categoryRepository.UpdateAsync(existing, cancellationToken);
        return ServiceResult<Category>.Ok(existing, "Category updated.");
    }
}
