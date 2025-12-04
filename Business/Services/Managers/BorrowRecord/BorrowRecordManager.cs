using AutoMapper;
using LibraryManagementSystem.Business.Dtos.BorrowRecordDtos;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces.BorrowRecord;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Managers.BorrowRecord;

public class BorrowRecordManager : IBorrowRecordService
{
    private readonly BorrowRecordRepository _borrowRecordRepository;
    private readonly INotificationService _notificationService;
    private readonly UserRepository _userRepository;
    private readonly IMapper _mapper;

    public BorrowRecordManager(BorrowRecordRepository borrowRecordRepository, NotificationRepository notificationRepository, UserRepository userRepository, IMapper mapper, INotificationService notificationService)
    {
        _borrowRecordRepository = borrowRecordRepository;
        _userRepository = userRepository;
        _mapper = mapper;
        _notificationService = notificationService;
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

    public async Task RequestReturnAsync(int id, int userId)
    {
        var borrowRecord = await _borrowRecordRepository.GetByIdAsync(id);
        if (borrowRecord == null || borrowRecord.UserId != userId)
            throw new ArgumentException("Borrow record not found or user mismatch");

        borrowRecord.ReturnRequested = true;
        await _borrowRecordRepository.UpdateAsync(borrowRecord);

        var staffIds = await _userRepository.GetUserIdsByRoleAsync("LibraryStaff");
        await _notificationService.CreateForUsersAsync(
            "İade Talebi",
            $"Kullanıcı #{userId} kitap #{borrowRecord.BookId} için iade talebi oluşturdu.",
            staffIds);
    }

    public async Task ApproveReturnAsync(int id)
    {
        var borrowRecord = await _borrowRecordRepository.GetByIdAsync(id);
        if (borrowRecord == null)
            throw new ArgumentException("Borrow record not found");

        borrowRecord.IsReturned = true;
        borrowRecord.ReturnDate = DateTime.UtcNow.Date;
        borrowRecord.ReturnRequested = false;
        await _borrowRecordRepository.UpdateAsync(borrowRecord);

        await _notificationService.CreateForUserAsync(
            "İade Talebi Onaylandı",
            $"Kitap #{borrowRecord.BookId} iade talebiniz onaylandı.",
            borrowRecord.UserId);
    }

    public async Task RejectReturnAsync(int id)
    {
        var borrowRecord = await _borrowRecordRepository.GetByIdAsync(id);
        if (borrowRecord == null)
            throw new ArgumentException("Borrow record not found");

        borrowRecord.ReturnRequested = false;
        await _borrowRecordRepository.UpdateAsync(borrowRecord);

        await _notificationService.CreateForUserAsync(
            "İade Talebi Reddedildi",
            $"Kitap #{borrowRecord.BookId} iade talebiniz reddedildi.",
            borrowRecord.UserId);
    }
}
