const mongoose = require('mongoose')
const nominee = require('./nominee')

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guildID: { type: String, required: true },
  creator: { type: String, required: true },
  targetRole: { type: String, required: true },
  openRoleCount: { type: Number, required: true },
  nominationSlot: Number,
  nominationPeriod: { type: Date, required: true },
  votingPeriod: { type: Date, required: true },
  nominees: { type: Map, of: nominee },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, default: Date.now() },
  nominated: [{ type: String }],
  voted: [{ type: String }],
  hasRoleTransferCompleted: { type: Boolean, default: false },
  isCancelled: { type: Boolean, default: false}
})

campaignSchema.virtual('isActive').get(function () {
  return Date.now() <= this.votingPeriod && !this.isCancelled
})

module.exports = mongoose.model('campaign', campaignSchema)
