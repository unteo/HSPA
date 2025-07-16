using System.Collections.Generic;

namespace WebAPI.Dtos
{
    public class GraphDto
    {
        public List<NodeDto> Nodes { get; set; } = new List<NodeDto>();
        public List<LinkDto> Links { get; set; } = new List<LinkDto>();
    }
}
