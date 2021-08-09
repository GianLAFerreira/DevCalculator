const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() })
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

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hours": valueHour
        }) 
        return res.redirect('/profile')
    },


}
