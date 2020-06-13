CREATE TABLE "sessions" (
  "id" int PRIMARY KEY,
  "session_data" jsonb,
  "profile_id" int
);

CREATE TABLE "profile" (
  "profile_id" int PRIMARY KEY,
  "age" int,
  "height" int,
  "weight" int,
  "disability_info" jsonb,
  "name" varchar
);

ALTER TABLE "sessions" ADD FOREIGN KEY ("profile_id") REFERENCES "profile" ("profile_id");
