const Base = require('../../../lib/objection').Model;

class Meter extends Base {
    static get tableName() {
      return 'meter';
    }
    static get relationMappings() {
      return {
        UsagePoint:{
          relation: Base.BelongsToOneRelation,
          modelClass: __dirname + "/UsagePoint",
          join: {
            from: 'meter.usagepoint_id',
            to: 'usagepoint.id'
          }
        }
      }
    }    
  }

  module.exports = Meter;