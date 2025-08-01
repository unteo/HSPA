using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace WebAPI.Models
{
    [Table("Addresses")]
    public class Address : BaseEntity
    {
        [Required]
        public string FullAddress { get; set; }
        [Required]
        [MaxLength(10)]
        public string ZipCode { get; set; }

        public int FloorNo { get; set; }

        public int TotalFloors { get; set; }

        public int PropertyId { get; set; }
        public Property Property { get; set; }

    }
}
