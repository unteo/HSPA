using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController :ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }


        [HttpGet("hierarchy-tree")] // Endpoint-ul pentru structura arborescentă brută
        public async Task<IActionResult> GetUserHierarchyTree()
        {
            var rootNode = await userService.BuildUserGraphAsync();

            if (rootNode == null)
            {
                return NotFound("No user hierarchy found or root node could not be determined.");
            }

            return Ok(rootNode);
        }

        [HttpGet("graph-dfs")] // Endpoint pentru graf cu parcurgere DFS
        public async Task<IActionResult> GetUserGraphDFS()
        {
            var graphData = await userService.GetUserGraphDFSAsync();

            if (!graphData.Nodes.Any())
            {
                return NotFound("No graph data found.");
            }

            return Ok(graphData);
        }

        [HttpGet("graph-bfs")] // Endpoint pentru graf cu parcurgere BFS
        public async Task<IActionResult> GetUserGraphBFS()
        {
            var graphData = await userService.GetUserGraphBFSAsync();

            if (!graphData.Nodes.Any())
            {
                return NotFound("No graph data found.");
            }

            return Ok(graphData);
        }
    }
}
