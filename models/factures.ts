import mongoose, { Schema } from "mongoose";

const FacturesSchema = new Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  authorizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prise_encharge' },
  invoiceNumber: { type: String, required: true, unique: true, trim: true },
  totalAmount: { type: Number, required: true, min: 0 },
  coveredAmount: { type: Number, required: true, min: 0 },
  patientResponsibility: { type: Number, required: true, min: 0 },
  dateIssued: { type: Date, default: Date.now },
  datePaid: { type: Date },
  isPaid: { type: Boolean, default: false },
  paymentMethod: { type: String, enum: ['cash', 'card', 'bank_transfer', 'insurance', 'other'], required: true },
  notes: { type: String, trim: true }
}, { timestamps: true });

FacturesSchema.index({ patientId: 1 });
FacturesSchema.index({ invoiceNumber: 1 }, { unique: true });
FacturesSchema.index({ authorizationId: 1 });
FacturesSchema.index({ isPaid: 1, dateIssued: -1 });

export const FacturesModel = mongoose.models.Factures || mongoose.model("Factures", FacturesSchema);