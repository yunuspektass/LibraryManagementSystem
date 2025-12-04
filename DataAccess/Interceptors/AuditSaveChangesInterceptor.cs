using System.Text.Json;
using LibraryManagementSystem.Core.Domain;
using LibraryManagementSystem.Core.Services.Interfaces;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;

namespace LibraryManagementSystem.DataAccess.Interceptors;

public class AuditSaveChangesInterceptor : SaveChangesInterceptor
{
    private readonly ICurrentUserService _currentUserService;
    private readonly ILogger<AuditSaveChangesInterceptor> _logger;
    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        WriteIndented = false,
        DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
    };

    public AuditSaveChangesInterceptor(ICurrentUserService currentUserService, ILogger<AuditSaveChangesInterceptor> logger)
    {
        _currentUserService = currentUserService;
        _logger = logger;
    }

    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        ApplyAudit(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        ApplyAudit(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void ApplyAudit(DbContext? context)
    {
        if (context == null)
        {
            return;
        }

        var now = DateTime.UtcNow;
        var userId = _currentUserService.UserId;
        var correlationId = _currentUserService.CorrelationId;

        var auditLogs = new List<AuditLog>();

        foreach (var entry in context.ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.Entity is AuditLog)
                continue;

            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = now;
                    entry.Entity.UpdatedAt = now;
                    entry.Entity.CreatedBy ??= userId;
                    entry.Entity.UpdatedBy = userId ?? entry.Entity.UpdatedBy;
                    auditLogs.Add(CreateAuditLog(entry, "Create", userId, correlationId, now));
                    break;

                case EntityState.Modified:
                    entry.Entity.UpdatedAt = now;
                    entry.Entity.UpdatedBy = userId ?? entry.Entity.UpdatedBy;
                    auditLogs.Add(CreateAuditLog(entry, "Update", userId, correlationId, now));
                    break;

                case EntityState.Deleted:
                    auditLogs.Add(CreateAuditLog(entry, "Delete", userId, correlationId, now));
                    break;
            }
        }

        if (auditLogs.Count > 0)
        {
            context.Set<AuditLog>().AddRange(auditLogs);
        }
    }

    private AuditLog CreateAuditLog(
        EntityEntry<BaseEntity> entry,
        string action,
        string? userId,
        string correlationId,
        DateTime timestamp)
    {
        var changes = GetPropertyChanges(entry, action);

        return new AuditLog
        {
            EntityName = entry.Entity.GetType().Name,
            EntityId = entry.Entity.Id == 0 ? null : entry.Entity.Id,
            Action = action,
            PerformedAt = timestamp,
            PerformedBy = userId,
            CorrelationId = correlationId,
            Changes = JsonSerializer.Serialize(changes, _jsonOptions)
        };
    }

    private static IReadOnlyCollection<PropertyChange> GetPropertyChanges(EntityEntry<BaseEntity> entry, string action)
    {
        var changes = new List<PropertyChange>();

        foreach (var property in entry.Properties)
        {
            if (property.Metadata.IsPrimaryKey())
                continue;

            if (action == "Update" && !property.IsModified)
                continue;

            var originalValue = action == "Create" ? null : ConvertToString(property.OriginalValue);
            var currentValue = ConvertToString(property.CurrentValue);

            if (action == "Update" && Equals(originalValue, currentValue))
                continue;

            changes.Add(new PropertyChange(property.Metadata.Name, originalValue, currentValue));
        }

        return changes;
    }

    private static string? ConvertToString(object? value) =>
        value switch
        {
            null => null,
            DateTime dateTime => dateTime.ToUniversalTime().ToString("O"),
            DateOnly dateOnly => dateOnly.ToString("yyyy-MM-dd"),
            bool boolean => boolean.ToString(),
            _ => value.ToString()
        };

    private record PropertyChange(string Property, string? OriginalValue, string? NewValue);
}
