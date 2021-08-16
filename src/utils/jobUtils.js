module.exports = {
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
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
        // to fixed arredonda para cima ou para baixo, caso eu queira arredondar para baixo eu posso utilizar o Math.floor

        //restam x dias
        return dayDiff
      
    },
    calculateBudget: (job, valueHour) => (valueHour * job["total-hours"])
}  