drop table if exists grand_parent, parent, child, child_1;
create table grand_parent(
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text,
    constraint grand_parent_pkey primary key(id)
);
create table parent(
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
    parent_id uuid,
    name text,
    constraint parent_pkey primary key(id)
);
create table child(
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
    parent_id uuid,
    name text,
    constraint child_pkey PRIMARY KEY(id)
);
create table child_1(
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
    parent_id uuid,
    name text,
    constraint child_1_pkey PRIMARY KEY(id)
);
insert into grand_parent values('22e1c365-a066-4398-8155-5a87e1614759', 'root');
insert into parent values('22e1c365-a066-4398-8155-5a87e1614760', '22e1c365-a066-4398-8155-5a87e1614759', 'root');