const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'system'],
    default: 'text'
  },
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  edited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
messageSchema.index({ chatId: 1, createdAt: -1 });

// Update chat's lastMessage and lastActivity when message is saved
messageSchema.post('save', async function() {
  await mongoose.model('Chat').findByIdAndUpdate(
    this.chatId,
    { 
      lastMessage: this._id,
      lastActivity: new Date()
    }
  );
});

messageModel = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default messageModel;