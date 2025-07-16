using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Dtos;

namespace WebAPI.Interfaces
{
    public interface IUserService
    {
        Task<UserNodeDto> BuildUserGraphAsync();
        Task <GraphDto> GetUserGraphDFSAsync();   
        Task<GraphDto> GetUserGraphBFSAsync();   
    }
}
