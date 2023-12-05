const { Schema, model } = require('mongoose')

const offerSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Should have a Title'],
            minlength: [3, 'Min 3 characters']
        },
        occupation: {
            type: String,
            required: [true, 'Write a occupation']
        },
        description: {
            type: String,
            required: true,
            minlength: [20, 'The description should have at least 20 characters'],
            maxlength: [160, 'Only 160 characters']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        company: {
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
                required: true
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