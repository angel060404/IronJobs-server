const { Schema, model } = require('mongoose')

const companySchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, 'Must have a name of the Companie'],
            minlength: [5, 'Should have at least 5 characters']
        },
        website: {
            type: String,
            validate: {
                validator: function (value) {
                    return value.includes('https://');
                },
                message: 'Website must be a url'
            }
        },
        field: {
            type: String,
            required: true,
            minlength: [5, 'Should have at least 5 characters']
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: [true, 'Must have a Image']
        },
        description: {
            type: String,
            minlength: [20, 'You must describe properly your company']

        },
        owner: {
            type: Schema.Types.ObjectId,
            required: [true, 'should have a owner']
        }
    },
    {
        timestamps: true
    }
)

const Company = model('Company', companySchema)

module.exports = Company