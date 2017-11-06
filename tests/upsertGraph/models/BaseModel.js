const objection = require('../../../lib/objection');
const Model = objection.Model;
const _ = require('lodash');

class Base extends Model {
    constructor(){
        super();
    }
}
module.exports = Base;
