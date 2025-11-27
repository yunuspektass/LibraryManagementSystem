using LibraryManagementSystem.Business.Dtos.MemberDtos;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controller;

[ApiController]
[Route("api/[controller]")]
public class MembersController : ControllerBase
{
    private readonly IMemberService _memberService;

    public MembersController(IMemberService memberService)
    {
        _memberService = memberService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var result = await _memberService.GetAllAsync(cancellationToken);
        return result.Success ? Ok(result.Data) : NotFound(result.Message);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var result = await _memberService.GetByIdAsync(id, cancellationToken);
        return result.Success ? Ok(result.Data) : NotFound(result.Message);
    }

    [HttpGet("{id:int}/borrow-history")]
    public async Task<IActionResult> GetBorrowHistory(int id, CancellationToken cancellationToken)
    {
        var result = await _memberService.GetWithBorrowHistoryAsync(id, cancellationToken);
        return result.Success ? Ok(result.Data) : NotFound(result.Message);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] MemberCreateDto dto, CancellationToken cancellationToken)
    {
        var member = new Member
        {
            Name = dto.Name,
            Surname = dto.Surname,
            Email = dto.Email,
            Phone = dto.Phone,
            RegistrationDate = dto.RegistrationDate ?? default
        };

        var result = await _memberService.CreateAsync(member, cancellationToken);
        return result.Success
            ? CreatedAtAction(nameof(GetById), new { id = result.Data!.Id }, result.Data)
            : BadRequest(result.Message);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] MemberUpdateDto dto, CancellationToken cancellationToken)
    {
        if (id != dto.Id)
        {
            return BadRequest("Güncellenecek kayıt id ile uyumsuz.");
        }

        var member = new Member
        {
            Id = dto.Id,
            Name = dto.Name,
            Surname = dto.Surname,
            Email = dto.Email,
            Phone = dto.Phone,
            RegistrationDate = dto.RegistrationDate
        };

        var result = await _memberService.UpdateAsync(member, cancellationToken);
        return result.Success ? Ok(result.Data) : NotFound(result.Message);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var result = await _memberService.DeleteAsync(id, cancellationToken);
        return result.Success ? Ok(result.Message) : NotFound(result.Message);
    }
}
