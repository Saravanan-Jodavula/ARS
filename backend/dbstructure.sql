CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "session_data" jsonb,
  "profile_id" int REFERENCES profile(profile_id) ON DELETE CASCADE
);

CREATE TABLE "profile" (
  "profile_id" SERIAL PRIMARY KEY,
  "age" int,
  "height" int,
  "weight" int,
  "disability_info" jsonb,
  "name" varchar
);

