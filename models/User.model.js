const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'You need a name'],
      minlength: [3, 'Should have at least 3 characters']
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [6, 'Should have at least 6 characters'],
      validate: {
        validator: function (value) {
          return value.includes('@')
        },
        message: 'Must be a Email with @'
      }
    },

    password: {
      type: String,
      required: [true, 'Password is required.']
    },

    avatar: {
      type: String,
      validate: {
        validator: function (value) {
          return value.includes('.jpg' || '.png');
        },
        message: 'must be a png or jpg'
      }
    },

    description: {
      type: String,
      required: [true, 'Must have Description'],
      minlength: [20, 'Should hvae at least 20 characters']
    },

    role: {
      type: String,
      enum: ['OWNER', 'USER', 'ADMIN'],
      default: 'USER'
    },
    age: {
      type: Number,
      min: [18, 'Only for people older than 18 '],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
