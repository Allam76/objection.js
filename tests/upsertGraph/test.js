const objection = require('../../lib/objection');
const Model = objection.Model;
const Knex = require('knex');
const metadata = require('./models');

const knex = Knex({
  client: 'pg',
  connection: {
    database: 'test',
    password: 'Aeris001',
    user: 'martin'
  }
});

Model.knex(knex);


async function test(){
    try{
        var bsa = await metadata.BusinessDocument.query().eager("UsagePoint").where({usagepoint_id:null});
        var data =  {
            id:bsa[0].id,
            UsagePoint:{
                id: "0360933f-7746-4d4c-aabf-9a248e8629f4",
                Meter:[{meter_identification: "000000000010000002", usagepoint_id:"0360933f-7746-4d4c-aabf-9a248e8629f4"}],
                Address:{streetname: "Hello", house_number:"AA", postcode:"1000", city:"Brussels"}
            }
            
        };
        var test = await metadata.BusinessDocument.query().upsertGraph(
            data,{relate:true, insertMissing:true}).debug();
        console.log(test);
    } catch(error){
        console.log(error);
    }             
}
test();
