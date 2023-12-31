module.exports = app => {

    // TODO: DESACOPLAR CONTROLADORES
    const offersRoutes = require("./offers.routes");
    app.use("/api/offers", offersRoutes)

    const companiesRoutes = require("./companies.routes");
    app.use("/api/companies", companiesRoutes)

    const authRoutes = require("./auth.routes");
    app.use("/api/auth", authRoutes)

    const uploadRoutes = require("./upload.routes");
    app.use("/api/upload", uploadRoutes)
}