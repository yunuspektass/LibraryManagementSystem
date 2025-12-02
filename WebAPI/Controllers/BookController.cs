using LibraryManagementSystem.Business.Dtos.BookDtos;
using LibraryManagementSystem.Business.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookListDto>>> GetList(
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] string? search,
        [FromQuery] string? availability,
        [FromQuery] string? categories,
        [FromQuery] int? yearFrom,
        [FromQuery] int? yearTo)
    {
        var categoryIds = ParseCategoryIds(categories);
        var books = await _bookService.GetList(startDate, endDate, search, categoryIds, availability, yearFrom, yearTo);
        return Ok(books);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BookGetDto>> GetItem(int id)
    {
        try
        {
            var book = await _bookService.GetItem(id);
            return Ok(book);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<BookCreateDto>> PostItem(BookCreateDto bookCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdBook = await _bookService.PostItem(bookCreateDto);
        return Ok(createdBook);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<BookGetDto>> PutItem(int id, BookUpdateDto bookUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _bookService.PutItem(id, bookUpdateDto);
        if (result == null)
            return NotFound();

        return Ok(result);
    }

    private static IEnumerable<int>? ParseCategoryIds(string? categories)
    {
        if (string.IsNullOrWhiteSpace(categories))
            return null;

        var parts = categories.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var list = new List<int>();
        foreach (var part in parts)
        {
            if (int.TryParse(part, out var id))
            {
                list.Add(id);
            }
        }
        return list.Count > 0 ? list : null;
    }
}
