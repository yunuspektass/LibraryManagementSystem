using AutoMapper;
using LibraryManagementSystem.Business.Dtos.AuthorDtos;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services.Interfaces.Author;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services.Managers.Author;

public class AuthorManager : IAuthorService
{
    private readonly AuthorRepository _authorRepository;
    private readonly IMapper _mapper;

    public AuthorManager(AuthorRepository authorRepository, IMapper mapper)
    {
        _authorRepository = authorRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AuthorListDto>> GetList(DateTime? startDate, DateTime? endDate)
    {
        var authors = await _authorRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<AuthorListDto>>(authors);
    }

    public async Task<AuthorGetDto> GetItem(int id)
    {
        var author = await _authorRepository.GetByIdAsync(id);
        if (author == null)
            throw new ArgumentException($"Author with id {id} not found");

        return _mapper.Map<AuthorGetDto>(author);
    }

    public async Task<AuthorCreateDto> PostItem(AuthorCreateDto authorCreateDto)
    {
        var author = _mapper.Map<Domain.Entities.Author>(authorCreateDto);
        await _authorRepository.AddAsync(author);
        return _mapper.Map<AuthorCreateDto>(author);
    }

    public async Task<AuthorGetDto?> PutItem(int id, AuthorUpdateDto authorUpdateDto)
    {
        var author = await _authorRepository.GetByIdAsync(id);
        if (author == null)
            return null;

        _mapper.Map(authorUpdateDto, author);
        await _authorRepository.UpdateAsync(author);
        return _mapper.Map<AuthorGetDto>(author);
    }
}

