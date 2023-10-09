using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReservesAPI.Models
{
    public class Reserves
    {
        [Key]
        public int ReserveID { get; set; }
        public int MeetingRoomID { get; set; }
        public DateTime? DataReserva { get; set; }
        public TimeSpan? HoraInici { get; set; }
        public TimeSpan? HoraFi { get; set; }

        //public string UserID { get; set; }

        [ForeignKey("MeetingRoomID")]
        public virtual Sales Sala { get; set; }

        /* [ForeignKey("UserID")]
         public virtual IdentityUser User { get; set; }
        */
    }
}
