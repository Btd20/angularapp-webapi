using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace webapi.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Key]
        public string Id { get; set; }
        public string Nom  { get; set; }
        public int Email { get; set; }
    }
}
