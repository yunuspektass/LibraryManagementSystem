using LibraryManagementSystem.Business.Dtos.BorrowRecordDtos;
using LibraryManagementSystem.Business.Services.Interfaces.BorrowRecord;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class BorrowRecordController : ControllerBase
{
    private readonly IBorrowRecordService _borrowRecordService;

    public BorrowRecordController(IBorrowRecordService borrowRecordService)
    {
        _borrowRecordService = borrowRecordService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BorrowRecordListDto>>> GetList([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var borrowRecords = await _borrowRecordService.GetList(startDate, endDate);
        return Ok(borrowRecords);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BorrowRecordGetDto>> GetItem(int id)
    {
        try
        {
            var borrowRecord = await _borrowRecordService.GetItem(id);
            return Ok(borrowRecord);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<BorrowRecordCreateDto>> PostItem(BorrowRecordCreateDto borrowRecordCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdBorrowRecord = await _borrowRecordService.PostItem(borrowRecordCreateDto);
        return Ok(createdBorrowRecord);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<BorrowRecordGetDto>> PutItem(int id, BorrowRecordUpdateDto borrowRecordUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _borrowRecordService.PutItem(id, borrowRecordUpdateDto);
        if (result == null)
            return NotFound();

        return Ok(result);
    }
}

