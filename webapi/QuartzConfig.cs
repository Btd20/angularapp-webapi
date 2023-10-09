using Quartz;
using Quartz.Impl;
using System;
using webapi.Data;
using Microsoft.Extensions.DependencyInjection;

public class QuartzConfig
{
    public static async void Start(IServiceProvider serviceProvider)
    {
        IScheduler scheduler = await StdSchedulerFactory.GetDefaultScheduler();
        await scheduler.Start();

        IJobDetail job = JobBuilder.Create<EnviarCorreuJob>()
            .WithIdentity("enviarCorreuJob", "grupo1")
            .UsingJobData(new JobDataMap { { "ServiceProvider", serviceProvider } }) // Pasa el proveedor de servicios
            .Build();

        ITrigger trigger = TriggerBuilder.Create()
            .WithIdentity("triggerCorreo", "grupo1")
            .StartNow()
            .WithSimpleSchedule(x => x
                .WithIntervalInMinutes(1) // Se ejecutará cada 1 minuto
                .RepeatForever())
            .Build();

        await scheduler.ScheduleJob(job, trigger);
    }
}
