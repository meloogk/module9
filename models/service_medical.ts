import mongoose, { Schema } from "mongoose";

const Services_medicalSchema = new Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true },
  basePrice: { type: Number, required: true, min: 0 },
  description: { type: String, trim: true }
}, { timestamps: true });

export const Services_medicalModel = mongoose.models.Services_medical || mongoose.model("Services_medical", Services_medicalSchema);