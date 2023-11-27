module.exports = app => {

    const offersRoutes = require("./offers.routes");
    app.use("/api/offers", offersRoutes)
    const companiesRoutes = require("./companies.routes");
    app.use("/api/companies", companiesRoutes)

}