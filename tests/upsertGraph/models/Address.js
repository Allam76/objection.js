const Base = require('./BaseModel');

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