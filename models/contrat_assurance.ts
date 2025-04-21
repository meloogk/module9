import mongoose, { Schema } from "mongoose";


const ContratSchema = new Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assureur', required: true },
  policyNumber: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  coveragePercentage: { type: Number, required: true, min: 0, max: 100 },
  maxCoverageAmount: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, default: true },
  notes: { type: String, trim: true }
}, { timestamps: true });

ContratSchema.virtual('isExpired').get(function () {
  return new Date() > this.endDate;
});

ContratSchema.index({ patientId: 1, providerId: 1 });
ContratSchema.index({ policyNumber: 1 });

export const ContratModel = mongoose.models.Contrat || mongoose.model("Contrat", ContratSchema);