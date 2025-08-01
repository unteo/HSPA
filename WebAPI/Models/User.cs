using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class User : BaseEntity
    {
     
        [Required]
        public string Username { get; set; }
        [Required]

        public byte[] Password { get; set; }

        public byte[] PasswordKey { get; set; }

        public int? FatherId { get; set; }

        public int CompanyId { get; set; }

    }



}
