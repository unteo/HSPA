using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Policies
{
    public class CompanyRequirement : IAuthorizationRequirement
    {
        public int RequiredCompanyId { get; }
        public CompanyRequirement(int companyId)
        {
            RequiredCompanyId = companyId;
        }
    }
}
