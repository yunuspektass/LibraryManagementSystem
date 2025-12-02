using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.Dtos.BorrowRecordDtos;

namespace LibraryManagementSystem.Business.Services.Interfaces.BorrowRecord;

public interface IBorrowRecordService
{
    Task<IEnumerable<BorrowRecordListDto>> GetList(DateTime? startDate, DateTime? endDate);
    Task<BorrowRecordGetDto> GetItem(int id);
    Task<BorrowRecordCreateDto> PostItem(BorrowRecordCreateDto borrowRecordCreateDto);
    Task<BorrowRecordGetDto?> PutItem(int id, BorrowRecordUpdateDto borrowRecordUpdateDto);
    Task RequestReturnAsync(int id, int userId);
    Task ApproveReturnAsync(int id);
    Task RejectReturnAsync(int id);
}
