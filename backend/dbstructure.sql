CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "session_data" jsonb,
  "profile_id" int REFERENCES profile(profile_id) ON DELETE CASCADE,
  "sid" varchar(20) UNIQUE,
  "date" DATE,
  "current" boolean
);

CREATE TABLE "profile" (
  "profile_id" SERIAL PRIMARY KEY,
  "age" int,
  "height" int,
  "weight" int,
  "disability_info" jsonb,
  "name" varchar,
  "unique_id" varchar(20) UNIQUE
);

CREATE TABLE "endpoint" (
  "id" varchar(50),
  "link" varchar(50)
);


CREATE TABLE "adminuser" (
  "username" varchar(50),
  "password" varchar(50)
);

insert into adminuser(username, password) values ('saravanan@codingstudio.club', '1234');
insert into endpoint(id, link) values ('url', 'localhost:3000');