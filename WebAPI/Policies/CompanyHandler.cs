using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace WebAPI.Policies
{
    public class CompanyHandler : AuthorizationHandler<CompanyRequirement>
    {
        protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, CompanyRequirement requirement)
        {
            var companyClaim = context.User.FindFirst(c => c.Type == "CompanyId");

            if (companyClaim == null)
            {
                return Task.CompletedTask;
            }

            if (int.TryParse(companyClaim.Value, out int userCompanyId) &&
                userCompanyId == requirement.RequiredCompanyId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        } 
    }
}
