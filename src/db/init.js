const Database = require('./config')

const initDb = {
    async init() {
        // async fala pro js que dentro da estrutura vai conter await e ela vai ter que esperar


        const db = await Database()
        // inicia conexao com o banco / abre a porta

        await db.exec(`
    CREATE TABLE profile( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`);

        await db.exec(`
    CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
    )`);

        await db.run(`
        INSERT INTO profile (
            name, 
            avatar, 
            monthly_budget, 
            days_per_week, 
            hours_per_day, 
            vacation_per_year,
            value_hour) 
            
            values (
                "Gian Lucas",
                "https://github.com/GianLAFerreira.png",
                3000,
                5,
                5,
                4,
                75
            )
    `);
        await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        )
        VALUES(
            "Pizzaria Guloso",
            2,
            1,
            1630455176656
        )
    `);
        await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        )
        VALUES(
            "One Two Project",
            3,
            47,
            1630455176656
        )
    `);


        await db.close()
        // fecha a porta do banco
    }
}


initDb.init()