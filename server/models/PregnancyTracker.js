const { Schema, model } = require("mongoose");

const PregnancyTrackerSchema = new Schema({
  userId: {
    // associated user
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  stage: {
    type: String,
    enum: ["pregnancy", "postpartum"], // pregnancy or postpartum only allowed
    required: true,
  },

  dueDate: {
    type: Date,
  },

  birthDate: {
    type: Date,
  },
});

const PregnancyTracker = model("PregnancyTracker", PregnancyTrackerSchema);

module.exports = PregnancyTracker;
