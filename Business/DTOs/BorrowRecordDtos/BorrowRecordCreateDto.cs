using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Business.Dtos.BorrowRecordDtos;

public class BorrowRecordCreateDto
{
    [Required]
    public int BookId { get; set; }

    [Required]
    public int MemberId { get; set; }

    [Required]
    public DateTime BorrowDate { get; set; }

    public DateTime? ReturnDate { get; set; }

    public bool IsReturned { get; set; }
}
