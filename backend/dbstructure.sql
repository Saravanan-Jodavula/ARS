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

