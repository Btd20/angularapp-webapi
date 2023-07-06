using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class Sales
    {
        [Key]
        public int MeetingRoomID { get; set; }  
        public string? NomSala { get; set; }

        public int OfficeID { get; set; }

        [ForeignKey("OfficeID")]
        public Oficines oficina { get; set; }
    }
}
