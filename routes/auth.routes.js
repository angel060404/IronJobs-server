const express = require('express')
const router = express.Router()

const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('./../models/User.model')
const saltRounds = 10

router.post('/sign-up', (req, res, next) => {

    const { email, age, password, name, avatar, description } = req.body

    if (password.length < 3) {
        res.status(400).json({ message: 'password should have 3 characters at least' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: 'This user already exist' })
                return
            }
            const salt = bycrypt.genSaltSync(saltRounds)
            const hashedPassword = bycrypt.hashSync(password, salt)

            return User.create({ age, email, password: hashedPassword, name, avatar, description })
        })
        .then((ceratedUser) => res.json(ceratedUser))
        //  res.sendStatus(201))
        .catch(err => next(err))

})

router.post('/log-in', (req, res, next) => {

    const { email, password } = req.body

    if (password === '' || password === '') {
        res.status(400).json({ message: 'give me a email and password' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: 'User not found , sign up!!!' })
                return
            }

            if (bycrypt.compareSync(password, foundUser.password)) {

                const { _id, email, name, avatar, role, age } = foundUser
                const payload = { _id, email, name, avatar, role, age }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                res.json({ authToken })

            } else {
                res.status(401).json({ message: 'incorrect password' })
            }
        })
        .catch(err => next(err))
})

module.exports = router