const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String
  },
  street: {
    type: String
  },
  townCity: {
    type: String
  },
  postCode: {
    type: String
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },

  profileImage: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;

      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
