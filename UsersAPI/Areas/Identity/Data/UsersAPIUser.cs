using Microsoft.AspNetCore.Identity;

namespace UsersAPI.Areas.Identity.Data
{
    // Add profile data for application users by adding properties to the UsersAPIUser class
    public class UsersAPIUser : IdentityUser
    {
        public string? Pais { get; set; }
        public string? Ciutat { get; set; }
        public string? Email { get; set; }
        public string? Oficina { get; set; }
        public bool Rol { get; set; }
        public byte[]? ProfileImage { get; set; }
    }
}

