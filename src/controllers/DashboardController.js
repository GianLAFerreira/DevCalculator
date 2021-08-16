const Job      = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile  = require('../model/Profile')

module.exports = {
    async index(req, res) {
        const jobs        = await Job.get()        
        const profile     = await Profile.get()

        let statusCount ={
            progress: 0,
            done: 0,
            total: jobs.length
        }
        // total de horas por dia de cada job em progresso
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {

        const remaining   = JobUtils.remainingDays(job)
        const status      = remaining <= 0 ? 'done' : 'progress'

        statusCount[status] += 1
        // Somando a quantidade de statusCount
        //EX: status = done
        // statusCount[done] += 1


        // total de horas por dia de cada job em progresso

        jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

       // Esse if é o mesmo que esta acima, porém o que esta acima é um função ternaria :)
       // if(status == 'progress'){
       //     jobTotalHours += Number(job["daily-hours"])
       // }


        return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hours"]) 
            }
        })  

        // qtd de horas que vou trabalhar (profile) menos a quantidade de horas/dias de cada job em progresso
        

        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    },
};