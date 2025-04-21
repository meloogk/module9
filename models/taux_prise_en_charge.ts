import mongoose, { Schema } from "mongoose";

const Prise_enchargeSchema = new Schema({
  contratId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrat', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Services_medical', required: true },
  requestedAmount: { type: Number, required: true, min: 0 },
  authorizedAmount: { type: Number, min: 0 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  requestDate: { type: Date, default: Date.now },
  responseDate: { type: Date },
  notes: { type: String, trim: true }
}, { timestamps: true });

Prise_enchargeSchema .index({ contractId: 1 });
Prise_enchargeSchema .index({ serviceId: 1 });
Prise_enchargeSchema .index({ status: 1 });

export const Prise_enchargeModel = mongoose.models.Prise_encharge || mongoose.model("Prise_encharge", Prise_enchargeSchema);