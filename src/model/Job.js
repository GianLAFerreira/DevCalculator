const Database = require('../db/config')



module.exports = {
    async get(){

        const db = await Database()

        const data = await db.all(`SELECT id,
                                           name,
                                           DAILY_HOURS [daily-hours],
                                           TOTAL_HOURS [total-hours],
                                           CREATED_AT  [created_at]
                                            FROM JOBS`)

        await db.close()

   

        return data
    },
    async update(updatedJob, jobid){
        
        const db = await Database()

        await db.run(`UPDATE jobs SET name        = "${updatedJob.name}",
                                      daily_hours =  ${updatedJob["daily-hours"]},
                                      total_hours =  ${updatedJob["total-hours"]}
                                        WHERE id = ${jobid}`)

        await db.close()

    },
    async delete(id){
        const db = await Database()

        await db.run(`DELETE FROM JOBS WHERE ID = ${id}`)

        await db.close()

    },
    async create (newJob){
        const db = await Database()

        await db.run(`INSERT INTO jobs (name, 
                                        DAILY_HOURS, 
                                        TOTAL_HOURS, 
                                        CREATED_AT) VALUES ("${newJob.name}",
                                                             ${newJob["daily-hours"]},
                                                             ${newJob["total-hours"]},
                                                             ${newJob["created_at"]})`)

        await db.close()

    }
}