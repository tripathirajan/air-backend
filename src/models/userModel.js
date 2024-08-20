const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let passwordHash = "";
  try {
    if (this.isNew || this.isModified("password")) {
      passwordHash = await bcrypt.hash(this.password, 5);
      this.password = passwordHash;
    }
    next();
  } catch (ex) {
    ex["extraInfo"] = { password: this.password, passwordHash: passwordHash };
    console.log("User Model> preSave:", ex);
    next(ex);
  }
});

userSchema.methods.hasPasswordMatched = async function (password) {
  let matched = false;
  try {
    matched = await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
  return matched;
};

module.exports = mongoose.model("User", userSchema);
