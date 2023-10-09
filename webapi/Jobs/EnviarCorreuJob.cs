using Quartz;
using webapi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

public class EnviarCorreuJob : IJob
{
    private readonly webapiContext _context;
    public async Task Execute(IJobExecutionContext context)
    {
        var serviceProvider = context.JobDetail.JobDataMap.Get("ServiceProvider") as IServiceProvider;
        using (var scope = serviceProvider.CreateScope())
        {
            var _context = scope.ServiceProvider.GetRequiredService<webapiContext>();
            var _emailService = scope.ServiceProvider.GetRequiredService<EmailService>();

            DateTime ahora = DateTime.Now;

            var reservas = await _context.Reserves.ToListAsync();

            foreach (var reserva in reservas)
            {
                DateTime horaInicioConFecha = (DateTime)(ahora.Date + reserva.HoraInici);
                DateTime tiempo15MinutosAntes = horaInicioConFecha.AddMinutes(-15);

                if (ahora >= tiempo15MinutosAntes && ahora < horaInicioConFecha)
                {
                    string userEmail = ObtenerEmailPorUserId(reserva.UserID);

                    _emailService.SendEmail(userEmail, "Recordatori de reserva", "La teva reserva començarà en 15 minuts.");
                }
            }
        }
    }

    private string ObtenerEmailPorUserId(string userId)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        return user?.Email;
    }
}
