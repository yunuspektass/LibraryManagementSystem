namespace LibraryManagementSystem.Core.Domain;

public abstract class BaseEntity : ISoftDeletable
{
    public int Id { get; set; }
    public bool Deleted { get; set; } = false;
}
