using LibraryManagementSystem.Business.Dtos.BookDtos;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controller;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IBookService _bookService;

    public BooksController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var result = await _bookService.GetAllAsync(cancellationToken);
        return result.Success ? Ok(result.Data) : NotFound(result.Message);
    }

    [HttpGet("available")]
    public async Task<IActionResult> GetAvailable(CancellationToken cancellationToken)
    {
        var result = await _bookService.GetAvailableAsync(cancellationToken);
        return result.Success ? Ok(result.Data) : NotFound(result.Message);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var result = await _bookService.GetByIdAsync(id, cancellationToken);
        return result.Success ? Ok(result.Data) : NotFound(result.Message);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BookCreateDto dto, CancellationToken cancellationToken)
    {
        var book = new Book
        {
            Title = dto.Title,
            AuthorId = dto.AuthorId,
            CategoryId = dto.CategoryId,
            ISBN = dto.ISBN,
            PublishDate = dto.PublishDate,
            IsAvailable = dto.IsAvailable
        };

        var result = await _bookService.CreateAsync(book, cancellationToken);
        return result.Success
            ? CreatedAtAction(nameof(GetById), new { id = result.Data!.Id }, result.Data)
            : BadRequest(result.Message);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] BookUpdateDto dto, CancellationToken cancellationToken)
    {
        if (id != dto.Id)
        {
            return BadRequest("Güncellenecek kayıt id ile uyumsuz.");
        }

        var book = new Book
        {
            Id = dto.Id,
            Title = dto.Title,
            AuthorId = dto.AuthorId,
            CategoryId = dto.CategoryId,
            ISBN = dto.ISBN,
            PublishDate = dto.PublishDate,
            IsAvailable = dto.IsAvailable
        };

        var result = await _bookService.UpdateAsync(book, cancellationToken);
        return result.Success ? Ok(result.Data) : NotFound(result.Message);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var result = await _bookService.DeleteAsync(id, cancellationToken);
        return result.Success ? Ok(result.Message) : NotFound(result.Message);
    }
}
