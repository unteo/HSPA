using System;
using System.Collections.Generic;
using static Tema.Program;
using System.Reflection.Emit;
using System.Linq;
using System.Xml.Linq;
using System.Text.Json.Serialization;
using System.Xml;
using System.Text.Json;

namespace Tema
{
    public class Program
    {

        public class Node
        {
            public string Id { get; set; }
            public string Label { get; set; }
        }

        public class Link
        {
            public string Source { get; set; }
            public string Target { get; set; }
        }

        public class Graph
        {
            public List<Node> Nodes { get; set; } = new List<Node>();
            public List<Link> Links { get; set; } = new List<Link>();
        }   


        public class User
        {
            public int UserId { get; set; }
            public string Username { get; set; }
            public int? ParentId { get; set; }

        }

        public class UserNode
        {
            public User user { get; set; }
            public List<UserNode> Children { get; set; } = new List<UserNode>();


        }
         
        public static void TraverseDFS(UserNode root)
        {
            if (root == null) return;

            List<Node> graphNodes = new List<Node>();
            List<Link> graphLinks = new List<Link>();

            Stack<UserNode> stack = new Stack<UserNode>();
            stack.Push(root);

            while (stack.Count > 0)
            {
                var current = stack.Pop();


                graphNodes.Add(new Node
                {
                    Id = current.user.UserId.ToString(),
                    Label = current.user.Username
                });

                foreach (var child in current.Children)
                {
                    graphLinks.Add(new Link
                    {
                        Source = current.user.UserId.ToString(),
                        Target = child.user.UserId.ToString()
                    });

                    stack.Push(child);
                }
            }

            Graph graphData = new Graph
            {
                Nodes = graphNodes,
                Links = graphLinks
            };


            string json = JsonSerializer.Serialize(graphData, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(json);
        }

        public static void TraverseBFS(UserNode root)
        { 
            if (root == null) return;

            List<Node> graphNodes = new List<Node>();
            List<Link> graphLinks = new List<Link>();

            Queue<UserNode> queue = new Queue<UserNode>();
            queue.Enqueue(root);

            while (queue.Count > 0)
            {
                var current = queue.Dequeue();

                graphNodes.Add(new Node
                {
                    Id = current.user.UserId.ToString(),
                    Label = current.user.Username
                });

                foreach (var child in current.Children)
                {
                    graphLinks.Add(new Link
                    {
                        Source = current.user.UserId.ToString(),
                        Target = child.user.UserId.ToString()
                    });

                    queue.Enqueue(child);
                }
            }

            Graph graphData = new Graph
            {
                Nodes = graphNodes,
                Links = graphLinks
            };


            string json = JsonSerializer.Serialize(graphData, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(json);

        }



        static void Main(string[] args)
        {
             List<User> users = new List<User>
        {
            new User { UserId = 1, Username = "John", ParentId = 3 },
            new User { UserId = 2, Username = "Jane", ParentId = 1 },
            new User { UserId = 3, Username = "Jack", ParentId = null },
            new User { UserId = 4, Username = "Jill", ParentId = 2 },
            new User { UserId = 5, Username = "Joe", ParentId = 1 },
            new User { UserId = 6, Username = "Jim", ParentId = 3 },

        };

           
            List<UserNode> userNodes = new List<UserNode>();

            foreach (var user in users)
            {
                var userNode = new UserNode { user = user };
                userNodes.Add(userNode);
            }

            UserNode root=null;

            foreach (var userNode in userNodes)
            {
                if(userNode.user.ParentId.HasValue)
                {
                    foreach(var parentNode in userNodes)
                    {
                        if (parentNode.user.UserId == userNode.user.ParentId.Value)
                        {
                            parentNode.Children.Add(userNode);
                            break;
                        }
                    }
                }
                else
                {
                    root = userNode;
                }
            }

            TraverseBFS(root);
            Console.WriteLine();
            TraverseDFS(root);

        }
    }
}
