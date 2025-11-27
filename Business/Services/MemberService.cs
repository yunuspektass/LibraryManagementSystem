using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services;

public class MemberService : IMemberService
{
    private readonly MemberRepository _memberRepository;

    public MemberService(MemberRepository memberRepository)
    {
        _memberRepository = memberRepository;
    }

    public async Task<ServiceResult<Member>> CreateAsync(Member member, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(member.Email))
        {
            return ServiceResult<Member>.Fail("E-posta zorunludur.");
        }

        member.RegistrationDate = member.RegistrationDate == default
            ? DateTime.UtcNow
            : member.RegistrationDate;

        var created = await _memberRepository.AddAsync(member, cancellationToken);
        return ServiceResult<Member>.Ok(created, "Uye eklendi.");
    }

    public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _memberRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult.Fail("Uye bulunamadi.");
        }

        await _memberRepository.DeleteAsync(existing, cancellationToken);
        return ServiceResult.Ok("Uye silindi.");
    }

    public async Task<ServiceResult<IReadOnlyCollection<Member>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var members = await _memberRepository.GetAllAsync(cancellationToken);
        return ServiceResult<IReadOnlyCollection<Member>>.Ok(members);
    }

    public async Task<ServiceResult<Member>> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var member = await _memberRepository.GetByIdAsync(id, cancellationToken);
        return member is null
            ? ServiceResult<Member>.Fail("Uye bulunamadi.")
            : ServiceResult<Member>.Ok(member);
    }

    public async Task<ServiceResult<Member>> GetWithBorrowHistoryAsync(int id, CancellationToken cancellationToken = default)
    {
        var member = await _memberRepository.GetWithBorrowHistoryAsync(id, cancellationToken);
        return member is null
            ? ServiceResult<Member>.Fail("Uye bulunamadi.")
            : ServiceResult<Member>.Ok(member);
    }

    public async Task<ServiceResult<Member>> UpdateAsync(Member member, CancellationToken cancellationToken = default)
    {
        var existing = await _memberRepository.GetByIdAsync(member.Id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult<Member>.Fail("Uye bulunamadi.");
        }

        existing.Name = member.Name;
        existing.Surname = member.Surname;
        existing.Email = member.Email;
        existing.Phone = member.Phone;
        existing.RegistrationDate = member.RegistrationDate;

        await _memberRepository.UpdateAsync(existing, cancellationToken);
        return ServiceResult<Member>.Ok(existing, "Uye guncellendi.");
    }
}
