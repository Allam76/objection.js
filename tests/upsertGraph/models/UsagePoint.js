const Base = require('../../../lib/objection').Model;

class UsagePoint extends Base {
    static get tableName() {
        return 'usagepoint';
    }
    static get externalKeys(){
        return ["EAN"];
    }
    static get relationMappings() {
        return {                  
            Address:{
                relation: Base.BelongsToOneRelation,
                modelClass: __dirname + "/Address",
                join: {
                    from: 'usagepoint.address',
                    to: 'address.id'
                }                
            },
            BusinessDocument:{
                relation: Base.HasManyRelation,
                modelClass: __dirname + "/BusinessDocument",
                join: {
                    from: 'usagepoint.id',
                    to: 'business_document.usagepoint_id'
                }                
            },
            Meter:{
                relation: Base.HasManyRelation,
                modelClass: __dirname + "/Meter",
                join:{
                    from: 'usagepoint.id',
                    to: 'meter.usagepoint_id'
                }
            }                                                   
        }
    }    
}
module.exports = UsagePoint;