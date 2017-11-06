DROP TABLE IF EXISTS public.business_document;

CREATE TABLE public.business_document
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    document_schema uuid,
    mapping_schema uuid,
    status character varying(10) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    payload jsonb,
    created_at timestamp(0) with time zone NOT NULL DEFAULT now(),
    modified_at timestamp(0) with time zone DEFAULT NULL::timestamp with time zone,
    modified_by uuid,
    period tsrange,
    scenario_id uuid,
    customer_id uuid,
    usagepoint_id uuid,
    type text COLLATE pg_catalog."default",
    sender_id uuid,
    receiver_id uuid,
    parent_id uuid,
    CONSTRAINT business_document_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.business_document
    OWNER to martin;

DROP TABLE IF EXISTS public.usagepoint;

CREATE TABLE public.usagepoint
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    ean character varying(30) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    issdp boolean DEFAULT false,
    ispod boolean DEFAULT true,
    isheadpoint boolean NOT NULL DEFAULT true,
    isproduction boolean NOT NULL DEFAULT false,
    primary_usagepoint uuid,
    address uuid,
    isactive boolean NOT NULL DEFAULT false,
    isdemolished boolean NOT NULL DEFAULT false,
    isprotected boolean NOT NULL DEFAULT false,
    islocked boolean NOT NULL DEFAULT false,
    grid_area uuid,
    infeed_area uuid,
    bill_area uuid,
    settle_area uuid,
    grid_operator uuid,
    trans_operator uuid,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    modified_at timestamp(6) with time zone DEFAULT NULL::timestamp with time zone,
    modified_by uuid,
    period tsrange,
    preswitch_id uuid,
    desync_flag boolean DEFAULT true,
    request_unlock_flag boolean DEFAULT true,
    CONSTRAINT usagepoint_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.usagepoint
    OWNER to martin;

DROP TABLE IF EXISTS public.address;

CREATE TABLE public.address
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    streetname character varying(100) COLLATE pg_catalog."default" NOT NULL DEFAULT NULL::character varying,
    house_number character varying(5) COLLATE pg_catalog."default" NOT NULL DEFAULT NULL::character varying,
    floor_number character varying(10) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    postcode character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT NULL::character varying,
    municipality character varying(50) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    city character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT NULL::character varying,
    country character varying(20) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    isprotected boolean NOT NULL DEFAULT false,
    created_at timestamp(6) without time zone NOT NULL DEFAULT now(),
    modified_at timestamp(6) without time zone DEFAULT NULL::timestamp without time zone,
    modified_by uuid,
    period tsrange,
    CONSTRAINT address_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.address
    OWNER to martin;

DROP TABLE IF EXISTS public.meter;

CREATE TABLE public.meter
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    meter_identification text COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    usagepoint_id uuid,
    created_at timestamp(6) with time zone DEFAULT now(),
    modified_at timestamp(6) with time zone DEFAULT NULL::timestamp with time zone,
    modified_by uuid,
    period tsrange,
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
