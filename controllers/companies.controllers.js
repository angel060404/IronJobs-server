const Company = require('../models/Company.model')
const User = require('./../models/User.model')
const Offer = require('../models/Offer.model')
const validator = require('validator');

const getCompanies = (req, res, next) => {

    Company
        .find()
        .select({ name: 1, image: 1, field: 1, description: 1, owner: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const oneCompany = (req, res, next) => {

    const { company_id } = req.params

    Company
        .findById(company_id)
        .populate('offers')
        .then(response => res.json(response))
        .catch(err => next(err))
}

const createCompany = (req, res, next) => {

    const { email, name, website, field, phoneNumber, image, description, } = req.body
    const { _id: owner } = req.payload

    Company
        .create({ email, owner, name, website, field, phoneNumber, image, description })
        .then(data => User.findByIdAndUpdate(owner, { $push: { companies: data._id }, role: 'OWNER' }))
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

const deleteCompany = (req, res, next) => {

    const { company_id } = req.params

    Company
        .findByIdAndDelete(company_id)
        .then(() => {
            return (
                Promise.all([
                    User.findOneAndUpdate(
                        { companies: company_id },
                        { $pull: { companies: company_id } },
                        { new: true }
                    ),
                    Offer.findOneAndDelete({ company: company_id })]))
        })

        .then(responsePromises => {

            const updatedUser = responsePromises[0]

            if (updatedUser && updatedUser.companies.length === 0) {
                return User.findByIdAndUpdate(updatedUser._id, { role: 'USER' }, { new: true });
            }
            return updatedUser;
        })

        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const editCompany = (req, res, next) => {

    const { company_id } = req.params
    const { email, name, website, field, phoneNumber, image, description, } = req.body

    Company
        .findByIdAndUpdate(company_id, { email, name, website, field, phoneNumber, image, description, })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

module.exports = {
    getCompanies,
    oneCompany,
    createCompany,
    deleteCompany,
    editCompany,
}