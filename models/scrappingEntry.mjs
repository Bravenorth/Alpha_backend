import mongoose from 'mongoose';

const scrappingEntrySchema = new mongoose.Schema({
  user: { type: String, required: true },
  isContract: { type: Boolean, required: true },
  contractPrice: { type: String },
  position: { type: String, required: true },
  shipToSalvage: { type: String, required: true },
  hourContractAccepted: { type: String, required: true },
  hourScrappingStarted: { type: String, required: true },
  shipInUseToScrap: { type: String, required: true },
  hourScrappingEnded: { type: String, required: true },
  amountRMC: { type: String, required: true },
  amountCM: { type: String, required: true },
  comments: { type: String },
  date: { type: String, required: true }
});

const ScrappingEntry = mongoose.model('ScrappingEntry', scrappingEntrySchema);

export default ScrappingEntry;
