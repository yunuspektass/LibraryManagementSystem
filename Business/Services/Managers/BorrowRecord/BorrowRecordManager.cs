using AutoMapper;
using LibraryManagementSystem.Business.Dtos.BorrowRecordDtos;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces.BorrowRecord;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Managers.BorrowRecord;

public class BorrowRecordManager : IBorrowRecordService
{
    private readonly BorrowRecordRepository _borrowRecordRepository;
    private readonly IMapper _mapper;

    public BorrowRecordManager(BorrowRecordRepository borrowRecordRepository, IMapper mapper)
    {
        _borrowRecordRepository = borrowRecordRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<BorrowRecordListDto>> GetList(DateTime? startDate, DateTime? endDate)
    {
        var borrowRecords = await _borrowRecordRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<BorrowRecordListDto>>(borrowRecords);
    }

    public async Task<BorrowRecordGetDto> GetItem(int id)
    {
        var borrowRecord = await _borrowRecordRepository.GetByIdAsync(id);
        if (borrowRecord == null)
            throw new ArgumentException($"BorrowRecord with id {id} not found");

        return _mapper.Map<BorrowRecordGetDto>(borrowRecord);
    }

    public async Task<BorrowRecordCreateDto> PostItem(BorrowRecordCreateDto borrowRecordCreateDto)
    {
        var borrowRecord = _mapper.Map<Domain.Entities.BorrowRecord>(borrowRecordCreateDto);
        await _borrowRecordRepository.AddAsync(borrowRecord);
        return _mapper.Map<BorrowRecordCreateDto>(borrowRecord);
    }

    public async Task<BorrowRecordGetDto?> PutItem(int id, BorrowRecordUpdateDto borrowRecordUpdateDto)
    {
        var borrowRecord = await _borrowRecordRepository.GetByIdAsync(id);
        if (borrowRecord == null)
            return null;

        _mapper.Map(borrowRecordUpdateDto, borrowRecord);
        await _borrowRecordRepository.UpdateAsync(borrowRecord);
        return _mapper.Map<BorrowRecordGetDto>(borrowRecord);
    }
}

