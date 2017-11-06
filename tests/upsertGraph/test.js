const objection = require('../../lib/objection');
const Model = objection.Model;
const Knex = require('knex');

// Initialize knex connection.
const knex = Knex({
  client: 'pg',
  connection: {
    database: 'test',
    password: 'password',
    user: 'martin'
  }
});

// Give the connection to objection.
Model.knex(knex);

class GrandParent extends Model {
    static get tableName() {
        return 'grand_parent';
    }    
    static get relationMappings() {
        return {
            Parents:{
            relation: Model.HasManyRelation,
            modelClass: Parent,
                join: {
                    from: 'grand_parent.id',
                    to: 'parent.parent_id'
                }
            }
        }
    }  
}

class Parent extends Model {
    static get tableName() {
        return 'parent';
    }    
    static get relationMappings() {
        return {
            Child:{
            relation: Model.HasManyRelation,
            modelClass: Child,
                join: {
                    from: 'parent.id',
                    to: 'child.parent_id'
                }
            }
        }
    }  
}


class Child extends Model {
    static get tableName() {
        return 'child';
    }
    static get relationMappings() {
        return {
            Parent:{
            relation: Model.BelongsToOneRelation,
            modelClass: Parent,
                join: {
                    from: 'child.parent_id',
                    to: 'parent.id'
                }
            }
        }
    }  
}
class Child1 extends Model {
    static get tableName() {
        return 'child_1';
    }
    static get relationMappings() {
        return {
            Parent:{
            relation: Model.BelongsToOneRelation,
            modelClass: Parent,
                join: {
                    from: 'child_1.parent_id',
                    to: 'parent.id'
                }
            }
        }
    }  
}

var input = {
    id: "22e1c365-a066-4398-8155-5a87e1614759",
    Parents:[{
        id: "22e1c365-a066-4398-8155-5a87e1614760",
        name: "parent",
        Child1:[{name:"TestChild1"}],
        Child:[{name:"TestChild"}]
    }]
}
GrandParent.query().upsertGraph(input, {relate:true, insertMissing:true}).debug().then(data=>console.log(data)).catch((error)=>{
    console.log(error);
});
