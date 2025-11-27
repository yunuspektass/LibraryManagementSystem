using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Core.Responses;
using LibraryManagementSystem.Domain.Entities;

namespace LibraryManagementSystem.Business.Services;

public class AuthorService : IAuthorService
{
    private readonly IRepository<Author> _authorRepository;

    public AuthorService(IRepository<Author> authorRepository)
    {
        _authorRepository = authorRepository;
    }

    public async Task<ServiceResult<Author>> CreateAsync(Author author, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(author.Name))
        {
            return ServiceResult<Author>.Fail("Author name is required.");
        }

        if (string.IsNullOrWhiteSpace(author.Surname))
        {
            return ServiceResult<Author>.Fail("Author surname is required.");
        }

        var created = await _authorRepository.AddAsync(author, cancellationToken);
        return ServiceResult<Author>.Ok(created, "Author created.");
    }

    public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _authorRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult.Fail("Author not found.");
        }

        await _authorRepository.DeleteAsync(existing, cancellationToken);
        return ServiceResult.Ok("Author deleted.");
    }

    public async Task<ServiceResult<IReadOnlyCollection<Author>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var authors = await _authorRepository.GetAllAsync(cancellationToken);
        return ServiceResult<IReadOnlyCollection<Author>>.Ok(authors);
    }

    public async Task<ServiceResult<Author>> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var author = await _authorRepository.GetByIdAsync(id, cancellationToken);
        return author is null
            ? ServiceResult<Author>.Fail("Author not found.")
            : ServiceResult<Author>.Ok(author);
    }

    public async Task<ServiceResult<Author>> UpdateAsync(Author author, CancellationToken cancellationToken = default)
    {
        var existing = await _authorRepository.GetByIdAsync(author.Id, cancellationToken);
        if (existing is null)
        {
            return ServiceResult<Author>.Fail("Author not found.");
        }

        existing.Name = author.Name;
        existing.Surname = author.Surname;
        existing.BirthDate = author.BirthDate;
        existing.Biography = author.Biography;

        await _authorRepository.UpdateAsync(existing, cancellationToken);
        return ServiceResult<Author>.Ok(existing, "Author updated.");
    }
}
