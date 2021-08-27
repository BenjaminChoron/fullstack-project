-- Deploy fullstack_project:json_functions to pg

BEGIN;

CREATE FUNCTION new_user(myRecord json) RETURNS int AS $$
	INSERT INTO "user" ("first_name", "last_name", "email", "password", "avatar_id")
	VALUES (
		myRecord->>'first_name',
		myRecord->>'last_name',
		myRecord->>'email',
		myRecord->>'password',
		(myRecord->>'avatar_id')::int
	) RETURNING id
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_user(json) RETURNS void AS $$
	UPDATE "user" SET
		first_name=$1->>'first_name',
		last_name=$1->>'last_name',
		email=$1->>'email',
		password=$1->>'password',
		avatar_id=($1->>'avatar_id')::int
	WHERE id=($1->>'id')::int;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION new_post(myRecord json) RETURNS int AS $$
	INSERT INTO "post" ("title", "subtitle", "content", "user_id", "image_id")
	VALUES (
		myRecord->>'title',
		myRecord->>'subtitle',
		myRecord->>'content',
		(myRecord->>'user_id')::int,
		(myRecord->>'image_id')::int
	) RETURNING id
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_post(json) RETURNS void AS $$
	UPDATE "post" SET
		title=$1->>'title',
		subtitle=$1->>'subtitle',
		content=$1->>'content',
		user_id=($1->>'user_id')::int,
		image_id=($1->>'image_id')::int
	WHERE id=($1->>'id')::int;
$$ LANGUAGE SQL STRICT;

COMMIT;
