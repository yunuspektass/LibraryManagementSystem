using LibraryManagementSystem.Core.Domain;

namespace LibraryManagementSystem.Domain.Entities;

public class AuditLog : BaseEntity
{
    public string EntityName { get; set; } = string.Empty;
    public int? EntityId { get; set; }
    public string Action { get; set; } = string.Empty;
    public string? Changes { get; set; }
    public DateTime PerformedAt { get; set; }
    public string? PerformedBy { get; set; }
    public string? CorrelationId { get; set; }
}
