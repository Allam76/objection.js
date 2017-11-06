const Base = require('../../../lib/objection').Model;

class BusinessDocument extends Base {
  static get tableName() {
    return 'business_document';
  }
  static get relationMappings() {
    return {
      UsagePoint: {
        relation: Base.BelongsToOneRelation,
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