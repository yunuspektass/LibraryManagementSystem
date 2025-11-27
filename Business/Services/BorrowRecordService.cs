using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services;

public class BorrowRecordService : IBorrowRecordService
{
    private readonly IRepository<BorrowRecord> _borrowRecordRepository;

    public BorrowRecordService(IRepository<BorrowRecord> borrowRecordRepository)
    {
        _borrowRecordRepository = borrowRecordRepository;
    }

    public async Task<ServiceResult<BorrowRecord>> CreateAsync(BorrowRecord borrowRecord, CancellationToken cancellationToken = default)
    {
        if (borrowRecord.BookId <= 0 || borrowRecord.MemberId <= 0)
        {
            return ServiceResult<BorrowRecord>.Fail("BookId and MemberId are required.");
        }

        borrowRecord.BorrowDate = borrowRecord.BorrowDate == default
            ? DateTime.UtcNow
            : borrowRecord.BorrowDate;

        var created = await _borrowRecordRepository.AddAsync(borrowRecord, cancellationToken);
        return ServiceResult<BorrowRecord>.Ok(created, "Borrow record created.");
    }

    public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _borrowRecordRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult.Fail("Borrow record not found.");
        }

        await _borrowRecordRepository.DeleteAsync(existing, cancellationToken);
        return ServiceResult.Ok("Borrow record deleted.");
    }

    public async Task<ServiceResult<IReadOnlyCollection<BorrowRecord>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var records = await _borrowRecordRepository.GetAllAsync(cancellationToken);
        return ServiceResult<IReadOnlyCollection<BorrowRecord>>.Ok(records);
    }

    public async Task<ServiceResult<BorrowRecord>> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var record = await _borrowRecordRepository.GetByIdAsync(id, cancellationToken);
        return record is null
            ? ServiceResult<BorrowRecord>.Fail("Borrow record not found.")
            : ServiceResult<BorrowRecord>.Ok(record);
    }

    public async Task<ServiceResult<BorrowRecord>> UpdateAsync(BorrowRecord borrowRecord, CancellationToken cancellationToken = default)
    {
        var existing = await _borrowRecordRepository.GetByIdAsync(borrowRecord.Id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult<BorrowRecord>.Fail("Borrow record not found.");
        }

        if (borrowRecord.BookId <= 0 || borrowRecord.MemberId <= 0)
        {
            return ServiceResult<BorrowRecord>.Fail("BookId and MemberId are required.");
        }

        existing.BookId = borrowRecord.BookId;
        existing.MemberId = borrowRecord.MemberId;
        existing.BorrowDate = borrowRecord.BorrowDate;
        existing.ReturnDate = borrowRecord.ReturnDate;
        existing.IsReturned = borrowRecord.IsReturned;

        await _borrowRecordRepository.UpdateAsync(existing, cancellationToken);
        return ServiceResult<BorrowRecord>.Ok(existing, "Borrow record updated.");
    }
}
