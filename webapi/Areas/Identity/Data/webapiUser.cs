using Microsoft.AspNetCore.Identity;

namespace webapi.Areas.Identity.Data
{
    // Add profile data for application users by adding properties to the webapiUser class
    public class webapiUser : IdentityUser
    {
        public string? Pais { get; set; }
        public string? Email { get; set; }
        public string? Oficina { get; set; }
        public bool Rol { get; set; }
    }
}

