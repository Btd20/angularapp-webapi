using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GeoLocalization.Models
{
    public class Ciutats
    { 
        [Key]
        public int CityID { get; set; }
        public string? NomCiutat { get; set; }
        public int CountryID { get; set; }

        [ForeignKey("CountryID")]
        public Pais pais { get; set; }

    }
}
