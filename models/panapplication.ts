import mongoose, { Schema, models } from "mongoose";

const PanApplicationSchema = new Schema(
  {
    panType: String,

    applicantName: {
      first: String,
      middle: String,
      last: String,
    },

    fatherName: {
      first: String,
      middle: String,
      last: String,
    },

    motherName: {
      first: String,
      middle: String,
      last: String,
    },

    dob: String,
    gender: String,
    email: String,
    mobile: String,
    aadhaar: String,
    aadhaarName: String,
    panNumber: String,

    addressType: String,
    address: String,
    pinCode: String,

    incomeSource: String,
    panPrint: String,
    representative: String,

    documents: {
      identityType: String,
      identityUrl: String,
      addressType: String,
      addressUrl: String,
      dobType: String,
      dobUrl: String,
    },

    photoUrl: String,
    signatureUrl: String,

    fee: Number,
    txnId: String,

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default models.PanApplication ||
  mongoose.model("PanApplication", PanApplicationSchema);