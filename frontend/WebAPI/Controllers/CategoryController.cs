using LibraryManagementSystem.Business.Dtos.CategoryDtos;
using LibraryManagementSystem.Business.Services.Interfaces.Category;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryListDto>>> GetList([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var categories = await _categoryService.GetList(startDate, endDate);
        return Ok(categories);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CategoryGetDto>> GetItem(int id)
    {
        try
        {
            var category = await _categoryService.GetItem(id);
            return Ok(category);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<CategoryCreateDto>> PostItem(CategoryCreateDto categoryCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdCategory = await _categoryService.PostItem(categoryCreateDto);
        return Ok(createdCategory);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<CategoryGetDto>> PutItem(int id, CategoryUpdateDto categoryUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _categoryService.PutItem(id, categoryUpdateDto);
        if (result == null)
            return NotFound();

        return Ok(result);
    }
}

