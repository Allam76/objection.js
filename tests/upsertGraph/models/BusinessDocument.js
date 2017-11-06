const BaseModel = require('./BaseModel');
const fs = require('fs');
const _ = require('lodash');

class BusinessDocument extends BaseModel {
  static get tableName() {
    return 'business_document';
  }
  static get relationMappings() {
    return {
      UsagePoint: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: __dirname + "/UsagePoint",
        join: {
          from: "business_document.usagepoint_id",
          to:"usagepoint.id"
        }         
      }                                          
    }
 }
}
module.exports = BusinessDocument;