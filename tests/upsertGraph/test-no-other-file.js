// This one can be run in standalone

const objection = require('objection');
const Base = objection.Model;
const Knex = require('knex');
const fs = require('fs');

async function test(){
    try{
        var knex = require('knex')({ client: 'pg', connection: {host: 'localhost', database:'postgres'}});
        // Will create a db called bug
        await knex.raw("DROP DATABASE IF EXISTS bug;");
        await knex.raw("CREATE DATABASE bug;");
        
        knex = require('knex')({ client: 'pg', connection: {database: "bug"}});
        await knex.raw(sql);
        Base.knex(knex);

        var bsa = await BusinessDocument.query().eager("UsagePoint").where({usagepoint_id:null});
        var data =  {
            id:bsa[0].id,
            UsagePoint:{
                id: "0360933f-7746-4d4c-aabf-9a248e8629f4",
                Meter:[{meter_identification: "000000000010000002", usagepoint_id:"0360933f-7746-4d4c-aabf-9a248e8629f4"}],
                Address:{streetname: "Hello", house_number:"AA", postcode:"1000"}
            }
            
        };
        var output = await BusinessDocument.query().upsertGraph(
            data,{relate:true, insertMissing:true}).debug();
        console.log(`Address exists in objection output but without id: ${JSON.stringify(output.UsagePoint.Meter[0],null, 2)}`);
        console.log(`There is no meter in database: ${await knex("meter")}`)
    } catch(error){
        console.log(error);
    }             
}
test();

class Address extends Base {
    static get tableName() {
        return 'address';
    }
    static get relationMappings() {
        return {
        }
    }  
}

class BusinessDocument extends Base {
    static get tableName() {
      return 'business_document';
    }
    static get relationMappings() {
      return {
        UsagePoint: {
          relation: Base.BelongsToOneRelation,
          modelClass: UsagePoint,
          join: {
            from: "business_document.usagepoint_id",
            to:"usagepoint.id"
          }         
        }                                          
      }
   }
  }

  class Meter extends Base {
    static get tableName() {
      return 'meter';
    }
    static get relationMappings() {
      return {
        UsagePoint:{
          relation: Base.BelongsToOneRelation,
          modelClass: UsagePoint,
          join: {
            from: 'meter.usagepoint_id',
            to: 'usagepoint.id'
          }
        }
      }
    }    
  }

  class UsagePoint extends Base {
    static get tableName() {
        return 'usagepoint';
    }
    static get relationMappings() {
        return {                  
            Address:{
                relation: Base.BelongsToOneRelation,
                modelClass: Address,
                join: {
                    from: 'usagepoint.address',
                    to: 'address.id'
                }                
            },
            BusinessDocument:{
                relation: Base.HasManyRelation,
                modelClass: BusinessDocument,
                join: {
                    from: 'usagepoint.id',
                    to: 'business_document.usagepoint_id'
                }                
            },
            Meter:{
                relation: Base.HasManyRelation,
                modelClass: Meter,
                join:{
                    from: 'usagepoint.id',
                    to: 'meter.usagepoint_id'
                }
            }                                                   
        }
    }    
}  
var sql = `
create extension if not exists "uuid-ossp";

CREATE TABLE public.business_document
(
    id uuid NOT NULL DEFAULT public.uuid_generate_v4(),
    usagepoint_id uuid,
    CONSTRAINT business_document_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.business_document
    OWNER to martin;

CREATE TABLE public.usagepoint
(
    id uuid NOT NULL DEFAULT public.uuid_generate_v4(),
    ean character varying(30) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    address uuid,
    CONSTRAINT usagepoint_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.usagepoint
    OWNER to martin;

CREATE TABLE public.address
(
    id uuid NOT NULL DEFAULT public.uuid_generate_v4(),
    streetname text,
    house_number text,
    postcode text,
    CONSTRAINT address_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.address
    OWNER to martin;

CREATE TABLE public.meter
(
    id uuid NOT NULL DEFAULT public.uuid_generate_v4(),
    meter_identification text COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    usagepoint_id uuid,
    CONSTRAINT meter_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.meter
    OWNER to martin;

INSERT INTO business_document (id) VALUES ('22e1c365-a066-4398-8155-5a87e1614760');
INSERT INTO usagepoint (id) VALUES ('22e1c365-a066-4398-8155-5a87e1614761');
`
