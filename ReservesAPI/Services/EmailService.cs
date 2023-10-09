using System.Net;
using System.Net.Mail;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public void SendEmail(string to, string subject, string body)
    {
        var emailConfig = _configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
        emailConfig.Password = _configuration["EMailKey"];

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
