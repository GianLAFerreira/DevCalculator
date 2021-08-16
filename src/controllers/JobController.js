const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
module.exports = {
    async save(req, res) {
        // re.body = {'name': '', 'daily-hours': '', 'total-hours': ''}
        // const job = req.body
        // job.created_at= Date.now() //atribuindo uma nova data

        // o ? é um opcional qie faz com que caso o valor não exista o sistema ignora e parte para o ||

        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        });
        
        return res.redirect('/')
    },
    create(req, res){
        return res.render("job")
    },
    async show(req, res) {

        const jobid = req.params.id
        const jobs = await Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobid))

        if(!job){
            return res.send('Job not found!')
        }
        const profile = await Profile.get()
        job.budget = JobUtils.calculateBudget(job, profile["value-hours"])

        return  res.render("job-edit", { job })
    },
    async update(req, res){
        const jobid = req.params.id

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }
        
        await Job.update(updatedJob, jobid)
        res.redirect('/job/' + jobid)
    },
    async delete(req,res){
        const jobid = req.params.id
      
        await Job.delete(jobid)

        return res.redirect('/')
    }
}