-- Deploy fullstack_project:draft to pg

BEGIN;

CREATE TABLE "draft_post" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "image_id" INTEGER NOT NULL REFERENCES "image"("id")
);

-- Drafts functions 

CREATE FUNCTION new_draft(myRecord json) RETURNS int AS $$
	INSERT INTO "draft_post" ("title", "subtitle", "content", "user_id", "image_id")
	VALUES (
		myRecord->>'title',
		myRecord->>'subtitle',
		myRecord->>'content',
		(myRecord->>'user_id')::int,
		(myRecord->>'image_id')::int
	) RETURNING id
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_draft(json) RETURNS void AS $$
	UPDATE "draft_post" SET
		title=$1->>'title',
		subtitle=$1->>'subtitle',
		content=$1->>'content',
		user_id=($1->>'user_id')::int,
		image_id=($1->>'image_id')::int
	WHERE id=($1->>'id')::int;
$$ LANGUAGE SQL STRICT;

COMMIT;
