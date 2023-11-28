const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
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
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
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
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
