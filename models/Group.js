const { Schema, model, Types } = require('mongoose');

const GroupSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['article', 'product'],
    required: true,
  },
  items: [{
    type: Types.ObjectId,
    required: true,
    refPath: 'itemModel'
  }],
  itemModel: {
    type: String,
    required: true,
    enum: ['JArticle', 'JProduct']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = model('Group', GroupSchema, 'Groups');
