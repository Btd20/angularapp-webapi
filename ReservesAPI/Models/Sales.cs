using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReservesAPI.Models
{
    public class Sales
    {
        [Key]
        public int MeetingRoomID { get; set; }
        public string? NomSala { get; set; }

        public int OfficeID { get; set; }

        public int Capacitat { get; set; }

        //[ForeignKey("OfficeID")]
        //public Oficines oficina { get; set; }
    }
}
