using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork uow;

        public UserService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task<UserNodeDto> BuildUserGraphAsync()
        {
           var users = await uow.UserRepository.GetUsersAsync();

            List<UserNodeDto> userNodesDto = new List<UserNodeDto>();

            foreach ( var user in users)
            {
                var userDto = new UserNodeDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    FatherId = user.FatherId
                };
                userNodesDto.Add(userDto);
            }

            UserNodeDto root = null;

            foreach(var userNode in userNodesDto)
            {
                if (userNode.FatherId.HasValue)
                {
                    foreach(var parentNode in userNodesDto)
                    { if(parentNode.Id == userNode.FatherId.Value)
                        {
                            parentNode.Children.Add(userNode);
                            break;
                        }
                    }

                }
                else {
                    root = userNode;
                }
            }

            return root;
        }

        public async Task<GraphDto> GetUserGraphBFSAsync()
        {
            UserNodeDto root = await BuildUserGraphAsync();

            if (root == null) return new GraphDto();

            GraphDto graphData = new GraphDto();
            Stack<UserNodeDto> stack = new Stack<UserNodeDto>();
            stack.Push(root);

            while (stack.Count > 0)
            {
                var current = stack.Pop();

                graphData.Nodes.Add(new NodeDto
                {
                    Id = current.Id.ToString(),
                    Label = current.Username
                });

                foreach (var child in current.Children)
                {
                    graphData.Links.Add(new LinkDto
                    {
                        Source = current.Id.ToString(),
                        Target = child.Id.ToString()
                    });
                    stack.Push(child);
                }

            }
            return graphData;
        }

        public async Task<GraphDto> GetUserGraphDFSAsync()
        {
            UserNodeDto root = await BuildUserGraphAsync();
            if (root == null) return new GraphDto();

            GraphDto graphData = new GraphDto();
            Queue<UserNodeDto> queue = new Queue<UserNodeDto>();
            queue.Enqueue(root);

            while (queue.Count > 0)
            {
               var current = queue.Dequeue();

                graphData.Nodes.Add(new NodeDto
                {
                    Id = current.Id.ToString(),
                    Label = current.Username
                });
                foreach (var child in current.Children)
                {
                    graphData.Links.Add(new LinkDto
                    {
                        Source = current.Id.ToString(),
                        Target = child.Id.ToString()
                    });
                    queue.Enqueue(child);
                }
            }
            return graphData;
        }
    }
}
