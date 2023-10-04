using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PaisosAPI.Models
{
    public class Pais
    {
        [Key]
        public int CountryID { get; set; }
        public string? NomPais { get; set; }

    }
}

