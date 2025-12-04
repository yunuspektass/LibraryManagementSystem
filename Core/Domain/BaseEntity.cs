namespace LibraryManagementSystem.Core.Domain;

public abstract class BaseEntity : ISoftDeletable
{
    public int Id { get; set; }
    public bool Deleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}
