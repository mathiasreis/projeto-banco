-- create table public.pokemon (
--   id integer primary key,
--   name text,
--   level integer,
--   type text
-- );

-- insert into public.pokemon (id, name, level, type) values (1, 'Bulbasaur', 2, 'grass');
-- insert into public.pokemon (id, name, level, type) values (4, 'Charmander', 7, 'fire');
-- insert into public.pokemon (id, name, level, type) values (7, 'Squirtle', 5, 'water');

create table "public"."Customer" (
    id integer primary key,
    name text,
    cpf text
);

create table "public"."Account" (
    id integer primary key,
    "customerId" integer,
    balance integer,
    foreign key ("customerId") references "public"."Customer" (id)
);
