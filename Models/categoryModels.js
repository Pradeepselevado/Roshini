const mongoose = require("mongoose");
const { Schema } = mongoose;

const Categoryschema = new Schema(
  {
    category_id: { type: String },
    category_name: {
      type: String,
    },
    category_image: {
      type: String,
    },
  },
  {
    suppressReservedKeysWarning: true,
  }
);

module.exports = mongoose.model("Categorycollection", Categoryschema);
