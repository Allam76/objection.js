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
