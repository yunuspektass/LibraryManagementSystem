using LibraryManagementSystem.Business.Dtos.AuthorDtos;
using LibraryManagementSystem.Business.Services.Interfaces.Author;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AuthorController : ControllerBase
{
    private readonly IAuthorService _authorService;

    public AuthorController(IAuthorService authorService)
    {
        _authorService = authorService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AuthorListDto>>> GetList([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var authors = await _authorService.GetList(startDate, endDate);
        return Ok(authors);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AuthorGetDto>> GetItem(int id)
    {
        try
        {
            var author = await _authorService.GetItem(id);
            return Ok(author);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<AuthorCreateDto>> PostItem(AuthorCreateDto authorCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdAuthor = await _authorService.PostItem(authorCreateDto);
        return Ok(createdAuthor);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<AuthorGetDto>> PutItem(int id, AuthorUpdateDto authorUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authorService.PutItem(id, authorUpdateDto);
        if (result == null)
            return NotFound();

        return Ok(result);
    }
}

