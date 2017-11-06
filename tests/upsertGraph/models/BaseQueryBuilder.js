const QueryBuilder = require('../../../lib/objection').QueryBuilder;

class BaseQueryBuilder extends QueryBuilder {
    constructor(modelClass){
        super(modelClass);
    }
}

module.exports = BaseQueryBuilder;
