using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using LibraryManagementSystem.Business.GenericRepository.IntRep;
using LibraryManagementSystem.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Business.GenericRepository.BaseRepo;

// Tüm Entity'ler için ortak CRUD operasyoonlarını içeren generic repo.
// BaseEntity sınıfından türeyen her entity bu repository yapısını kullanabilir

public abstract class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
{
    
    protected BaseRepository(DbContext context)
    {
        Context = context ?? throw new ArgumentNullException(nameof(context));
        DbSet = Context.Set<TEntity>();
    }

    protected DbContext Context { get; }
    protected DbSet<TEntity> DbSet { get; }

    // CREATE
    public virtual async Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(entity);

        await DbSet.AddAsync(entity, cancellationToken);
        await Context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    // DELETE (Soft Delete)
    public virtual async Task DeleteAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(entity);

        entity.Deleted = true;
        DbSet.Update(entity);
        await Context.SaveChangesAsync(cancellationToken);
    }

    // DESTROY (Hard Delete)
    public virtual async Task DestroyAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(entity);

        DbSet.Remove(entity);
        await Context.SaveChangesAsync(cancellationToken);
    }

    // READ 
    public virtual async Task<IReadOnlyCollection<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var items = await DbSet.AsNoTracking().ToListAsync(cancellationToken);
        return items;
    }

    // Id'ye göre tek bir kayıt getirir
    public virtual async Task<TEntity?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await DbSet.FindAsync(new object?[] { id }, cancellationToken);
    }

    // UPDATE 
    public virtual async Task UpdateAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(entity);

        DbSet.Update(entity);
        await Context.SaveChangesAsync(cancellationToken);
    }
}
