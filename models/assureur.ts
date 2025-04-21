import mongoose, { Schema } from "mongoose";

const AssureurSchema = new Schema({
  name: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, trim: true },
  contractFile: { type: String, trim: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const AssureurModel = mongoose.models.Assureur || mongoose.model("Assureur", AssureurSchema);