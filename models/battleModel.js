const mongoose = require("mongoose");

const battleSchema = new mongoose.Schema(
  {
    user_a: {
      photo: {
        type: String,
      },
      like: {
        type: Number,
      },
      isliked: {
        type: Boolean,
        default: false,
      },
      win: {
        type: Boolean,
        default: false,
      },
    },
    user_aid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User must belong to a user"],
    },
    user_bid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User must belong to a user"],
    },
    user_b: {
      photo: {
        type: String,
      },
      like: {
        type: Number,
      },
      isliked: {
        type: Boolean,
        default: false,
      },
      win: {
        type: Boolean,
        default: false,
      },
    },
    time: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { versionKey: false }
);

battleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user_aid",
    select: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "createdAt",
    ],
  });
  this.populate({
    path: "user_bid",
    select: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "createdAt",
    ],
  });
  next();
});

const Battle = mongoose.model("Battle", battleSchema);

module.exports = Battle;
