using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class Oficines
    {
        public int OfficeID { get; set; }
        public string? NomOficina { get; set; }
        public int CityID { get; set; }

        [ForeignKey ("CityID")]

        public Ciutats ciutat { get; set; }
    }
}
