namespace LibraryManagementSystem.Business.Dtos.AnnouncementDtos;

public class AnnouncementListDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    public string? PublishedBy { get; set; }
}
