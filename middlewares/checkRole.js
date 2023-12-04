const checkRole = (...admittedRoles) => (req, res, next) => {

    const { role } = req.payload

    if (admittedRoles.includes(role)) {
        next()
    }
}

module.exports = { checkRole }


