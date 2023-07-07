using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class Reserves
    {
        [Key]
        public int ReserveID { get; set; }
        public int MeetingRoomID { get; set; }
        public DateTime? DataReserva { get;set; }
        public DateTime? HoraInici { get;set; }
        public DateTime? HoraFi { get;set; }
        public string UserID { get; set; }

        [ForeignKey("MeetingRoomID")]

        public virtual Sales sala { get;set; }

       /* [ForeignKey("UserID")]
        public virtual IdentityUser User { get; set; }
       */

    }
}
