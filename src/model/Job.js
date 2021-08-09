let data = [
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
];

module.exports = {
    get(){
        return data
    }
}