using AutoMapper;
using LibraryManagementSystem.Business.Dtos.CategoryDtos;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces.Category;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Managers.Category;

public class CategoryManager : ICategoryService
{
    private readonly CategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public CategoryManager(CategoryRepository categoryRepository, IMapper mapper)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryListDto>> GetList(DateTime? startDate, DateTime? endDate)
    {
        var categories = await _categoryRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<CategoryListDto>>(categories);
    }

    public async Task<CategoryGetDto> GetItem(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
            throw new ArgumentException($"Category with id {id} not found");

        return _mapper.Map<CategoryGetDto>(category);
    }

    public async Task<CategoryCreateDto> PostItem(CategoryCreateDto categoryCreateDto)
    {
        var category = _mapper.Map<Domain.Entities.Category>(categoryCreateDto);
        await _categoryRepository.AddAsync(category);
        return _mapper.Map<CategoryCreateDto>(category);
    }

    public async Task<CategoryGetDto?> PutItem(int id, CategoryUpdateDto categoryUpdateDto)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
            return null;

        _mapper.Map(categoryUpdateDto, category);
        await _categoryRepository.UpdateAsync(category);
        return _mapper.Map<CategoryGetDto>(category);
    }
}

