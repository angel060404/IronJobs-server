const { Schema, model } = require('mongoose')

const offerSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Should have a Title']
        },
        occupation: {
            type: String,
            requires: [true, 'Write a occupation']
        },
        description: {
            type: String,
            required: true,
            minlength: [20, 'THe description should have at least 20 characters']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        },
        salary: {
            type: String,
            required: [true, 'should have a Salary']
        },
        applicants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        location: {
            type: {
                type: String,
            },
            coordinates: {
                type: [Number],
            }
        },
        type: {
            type: String,
            required: true,
            enum: ["part-time", "full-time"]
        },
        duration: {
            type: String,
            required: [true, 'must have a duration']
        },
        imageUrl: {
            type: String,
            required: [true, 'Should have a image']
        }
    },
    {
        timestamps: true
    }
)

const Offer = model('Offer', offerSchema)

module.exports = Offer