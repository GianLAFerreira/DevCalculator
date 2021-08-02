const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"
//req, res
//const basePath = __dirname + "views"
//dirname vem no meu diretorio srv onde esta o nodemoont o + concatena o diretório em questão

const Profile = {
    data: {
        name: "Gian",
        avatar: "https://github.com/GianLAFerreira.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5, 
        "vacation-per-year": 4,
        "value-hours": 75
    },
    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },
        update(req, res){
            // req.body para buscar os dados
            const data = req.body

            // definir quantas semanas tem em um arredondar
            const weeksPerYear = 52

            // remover as semanas de férias do ano, para pegar quantas semanas tem em um mês
            const weeksPerMonth =  (weeksPerYear - data["vacation-per-year"]) /12

            // quantas horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            // total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth

            // qual é o valor da minha hora criar

            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hours": valueHour
            }
            return res.redirect('/profile')
        },
        show(req, res) {

            const jobid = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobid))

            if(!job){
                return res.send('Job not found!')
            }
            job.budget = Job.services.calculateBudget(job, Profile.data["value-hours"])

            return  res.render(views + "job-edit", { job })
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
}
const Job = {
    data:[
        {
            id:  1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now()
        },
        {
            id:  2,
            name: "testando essa merda",
            "daily-hours": 1,
            "total-hours": 4,
            created_at: Date.now()
        }
    ],
    controllers: {
        index(req, res) {

            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hours"])
                }
            })  
            return res.render(views + "index", { jobs: updatedJobs })
        },
        save(req, res) {
            // re.body = {'name': '', 'daily-hours': '', 'total-hours': ''}
            // const job = req.body
            // job.created_at= Date.now() //atribuindo uma nova data

            const lastId= Job.data[Job.data.length -1]?.id || 0;
            // o ? é um opcional qie faz com que caso o valor não exista o sistema ignora e parte para o ||

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })
            return res.redirect('/')
        },
        create(req, res){
            return res.render(views + "job")
        }
    },
    services: {
        remainingDays(job){
            //calculo do tempo retante == 'total-hours' / 'daily-hours'
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            //.toFixed serve para arredondar 
    
            const createdDate = new Date(job.created_at)
            //new é um função construtora que transforma em um objeto
            //diferça de getDay pro getDate é que o getDay pega o dia da semana de 0 a 6 e o getDate pega o dia do mês
            const dueDay= createdDate.getDate() + Number(remainingDays)
            //const dueDate = createdDate.setDate()
            const dueDateInMS = createdDate.setDate(dueDay)
            // set date é um função que ira criar uma nova data 
    
            const timeDiffInMs = dueDateInMS - Date.now()
    
            //transformar milisegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            // to fixed arredonda para cima ou para baixo, caso eu queira arredondar para baixo eu posso utilizar o Math.floor

            //restam x dias
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }    
}

routes.get ('/',        Job.controllers.index)
routes.get ('/job',     Job.controllers.create)
routes.get ('/job/:id', Profile.controllers.show)
routes.get ('/profile', Profile.controllers.index)

routes.post('/job',            Job.controllers.save)
routes.post('/job/:id',        Profile.controllers.update)
routes.post('/profile',        Profile.controllers.update)
routes.post('/job/delete/:id', Profile.controllers.delete)


    



module.exports = routes;