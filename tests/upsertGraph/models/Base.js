const Base = require('../BaseModel');
const QueryBuilder = require('../BaseQueryBuilder');
var metadata = require('../metadata');

class BaseQueryBuilder extends QueryBuilder{
    constructor(data){
        super(data);
        this.withSchema("metadata");
    }
}
class BaseModel extends Base {
    static get QueryBuilder(){
        return BaseQueryBuilder;
    }
    static get schema(){
        return "public";
    }
     async setErrorMessage(error){
        var errorData = {
            type: "error",
            message: error.toString(),
            stack: error.stack
        }
        var message = await metadata.base.Message.query()
        .withSchema("metadata")
        .insertAndFetch(errorData).catch(error=>console.log(error));

        await message.$relatedQuery('Action').withSchema("metadata").relate(this.id);
        }
}
module.exports = BaseModel;