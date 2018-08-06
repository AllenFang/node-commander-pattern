-- Adminer 4.6.3 PostgreSQL dump

\connect "postgres";

DROP TABLE IF EXISTS "todoitem";
DROP SEQUENCE IF EXISTS todoitem_id_seq;
CREATE SEQUENCE todoitem_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."todoitem" (
    "id" integer DEFAULT nextval('todoitem_id_seq') NOT NULL,
    "name" text NOT NULL,
    "listid" integer,
    CONSTRAINT "todoitem_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "todoitem" ("id", "name", "listid") VALUES
(1,	'One Item',	1),
(2,	'Second Item',	1);

DROP TABLE IF EXISTS "todolist";
DROP SEQUENCE IF EXISTS todolist_id_seq;
CREATE SEQUENCE todolist_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."todolist" (
    "id" integer DEFAULT nextval('todolist_id_seq') NOT NULL,
    "name" text NOT NULL,
    "userid" integer,
    CONSTRAINT "todolist_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "todolist" ("id", "name", "userid") VALUES
(1,	'My first TodoList',	1);

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" text NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "name") VALUES
(1,	'Allen');

-- 2018-08-06 11:53:11.433823+00
