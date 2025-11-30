using AutoMapper;
using LibraryManagementSystem.Business.Dtos.UserDtos;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces.User;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using IdentityUserManager = Microsoft.AspNetCore.Identity.UserManager<LibraryManagementSystem.Domain.Entities.User>;

namespace LibraryManagementSystem.Business.Services.Managers.User;

public class UserManager : IUserService
{
    private readonly UserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IdentityUserManager _identityUserManager;

    public UserManager(UserRepository userRepository, IMapper mapper, IdentityUserManager identityUserManager)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _identityUserManager = identityUserManager;
    }

    public async Task<IEnumerable<UserListDto>> GetList(DateTime? startDate, DateTime? endDate)
    {
        var users = await _userRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<UserListDto>>(users);
    }

    public async Task<UserGetDto> GetItem(int id)
    {
        var user = await _userRepository.GetWithBorrowHistoryAsync(id);
        if (user == null)
            throw new ArgumentException($"User with id {id} not found");

        return _mapper.Map<UserGetDto>(user);
    }

    public async Task<UserCreateDto> PostItem(UserCreateDto userCreateDto)
    {
        var user = _mapper.Map<Domain.Entities.User>(userCreateDto);
        user.UserName = userCreateDto.Email;
        
        if (userCreateDto.RegistrationDate == null)
        {
            user.RegistrationDate = DateTime.UtcNow;
        }

        await _identityUserManager.CreateAsync(user, userCreateDto.Password);
        return _mapper.Map<UserCreateDto>(user);
    }

    public async Task<UserGetDto?> PutItem(int id, UserUpdateDto userUpdateDto)
    {
        var user = await _identityUserManager.FindByIdAsync(id.ToString());
        if (user == null)
            return null;

        _mapper.Map(userUpdateDto, user);
        user.UserName = userUpdateDto.Email;
        await _identityUserManager.UpdateAsync(user);
        
        var updatedUser = await _userRepository.GetWithBorrowHistoryAsync(id);
        return updatedUser != null ? _mapper.Map<UserGetDto>(updatedUser) : null;
    }
}

