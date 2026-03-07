

// module.exports = mongoose.model('Purchase', purchaseSchema);
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  sessionId: String,
  bookId: mongoose.Schema.Types.ObjectId,
  email: String,
  paid: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
