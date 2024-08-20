const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Airline name is required"],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Airline code is required"],
      unique: true,
      uppercase: true,
      minlength: [2, "Code should be at least 2 characters"],
      maxlength: [3, "Code should be at most 3 characters"],
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    fleetSize: {
      type: Number,
      min: [1, "Fleet size must be at least 1"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airline", airlineSchema);
