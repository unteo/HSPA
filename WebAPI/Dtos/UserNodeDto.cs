using System.Collections.Generic;

namespace WebAPI.Dtos
{
    public class UserNodeDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int? FatherId { get; set; }
        public List<UserNodeDto> Children { get; set; } = new List<UserNodeDto>();
    }
}
