using System.Net;
using System.Net.Mail;

public class EmailService
{
    public void SendEmail(string to, string subject, string body)
    {
        var emailConfig = new EmailConfiguration
        {
            From = "acmerooms@gmail.com",
            SmtpServer = "smtp.gmail.com",
            Port = 587,
            UserName = "acmerooms@gmail.com",
            Password = "dtid mrgz liap dbjr"
        };

        var smtpClient = new SmtpClient(emailConfig.SmtpServer)
        {
            Port = emailConfig.Port,
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(emailConfig.UserName, emailConfig.Password)
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(emailConfig.From),
            Subject = subject,
            Body = body,
            IsBodyHtml = true,
        };

        mailMessage.To.Add(to);

        smtpClient.Send(mailMessage);
    }
}
