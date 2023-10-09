using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GeoLocalization.Models
{
    public class Oficines
    {
        [Key]
        public int OfficeID { get; set; }
        public string? NomOficina { get; set; }
        public int CityID { get; set; }

        [ForeignKey("CityID")]

        public Ciutats ciutat { get; set; }
    }
}
