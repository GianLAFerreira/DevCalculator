const Job = require('../model/Job')
const JobUtils = require('../model/Jobutils')
const Profile = require('../model/Profile')
module.exports = {
    index(req, res) {
        const updatedJobs = Job.get().map((job) => {
        const profile     = Profile.get
        const remaining   = JobUtils.remainingDays(job)
        const status      = remaining <= 0 ? 'done' : 'progress'
        return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hours"])
            }
        })  
        return res.render("index", { jobs: updatedJobs })
    },
    save(req, res) {
        // re.body = {'name': '', 'daily-hours': '', 'total-hours': ''}
        // const job = req.body
        // job.created_at= Date.now() //atribuindo uma nova data
        const jobs   = Job.get()
        const lastId = jobs[jobs.length -1]?.id || 0;
        // o ? é um opcional qie faz com que caso o valor não exista o sistema ignora e parte para o ||

        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })
        return res.redirect('/')
    },
    create(req, res){
        return res.render("job")
    },
    show(req, res) {

        const jobid = req.params.id

        const job = Job.data.find(job => Number(job.id) === Number(jobid))

        if(!job){
            return res.send('Job not found!')
        }
        job.budget = Job.services.calculateBudget(job, Profile.get()["value-hours"])

        return  res.render("job-edit", { job })
    },
    update(req, res){
        const jobid = req.params.id

        const job = Job.data.find(job => Number(job.id) === Number(jobid))

        if(!job){
            return res.send('I caraio2' + req.params.id + 'space' + Number(jobid))
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        Job.data = Job.data.map(job => {
            if(Number(job.id) === Number(jobid)){
                job = updatedJob
            }

            return job
        })
        res.redirect('/job/' + jobid)
    },
    delete(req,res){
        const jobid = req.params.id

        Job.data = Job.data.filter(job => Number(job.id) !== Number(jobid))

        return res.redirect('/')
    }
}