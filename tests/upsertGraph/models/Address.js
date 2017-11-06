const Base = require('../../../lib/objection').Model;

class Address extends Base {
  static get tableName() {
    return 'address';
  }
 static get relationMappings() {
   return {
   }
 }  
}

module.exports = Address;