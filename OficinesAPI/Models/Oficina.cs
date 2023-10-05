using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OficinesAPI.Models
{
    public class Oficina
    {
        [Key]
        public int OfficeID { get; set; }
        public string? NomOficina { get; set; }
        public int CityID { get; set; }

        [ForeignKey("CityID")]

        public Ciutat ciutat { get; set; }
    }
}
