using Microsoft.AspNetCore.Identity;

namespace UsersAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Rolaso { get; set; }
    }
}