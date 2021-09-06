-- Deploy fullstack_project:json_functions to pg

BEGIN;

-- User functions

CREATE FUNCTION new_user(myRecord json) RETURNS int AS $$
	INSERT INTO "user" ("first_name", "last_name", "email", "password", "github", "linkedin", "twitter", "avatar_id")
	VALUES (
		myRecord->>'first_name',
		myRecord->>'last_name',
		myRecord->>'email',
		myRecord->>'password',
		myRecord->>'github',
		myRecord->>'linkedin',
		myRecord->>'twitter',
		(myRecord->>'avatar_id')::int
	) RETURNING id
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_user(json) RETURNS void AS $$
	UPDATE "user" SET
		first_name=$1->>'first_name',
		last_name=$1->>'last_name',
		email=$1->>'email',
		password=$1->>'password',
		github=$1->>'github',
		linkedin=$1->>'linkedin',
		twitter=$1->>'twitter',
		avatar_id=($1->>'avatar_id')::int
	WHERE id=($1->>'id')::int;
$$ LANGUAGE SQL STRICT;


-- Post functions 

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


-- Project functions

CREATE FUNCTION new_project(myRecord json) RETURNS int AS $$
	INSERT INTO "project" ("title", "content", "github_link", "web_link", "user_id", "image_id")
	VALUES (
		myRecord->>'title',
		myRecord->>'content',
		myRecord->>'github_link',
		myRecord->>'web_link',
		(myRecord->>'user_id')::int,
		(myRecord->>'image_id')::int
	) RETURNING id
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_project(json) RETURNS void AS $$
	UPDATE "project" SET
		title=$1->>'title',
		content=$1->>'content',
		github_link=$1->>'github_link',
		web_link=$1->>'web_link',
		user_id=($1->>'user_id')::int,
		image_id=($1->>'image_id')::int
	WHERE id=($1->>'id')::int;
$$ LANGUAGE SQL STRICT;


-- Message function

CREATE FUNCTION new_message(myRecord json) RETURNS int AS $$
	INSERT INTO "message" ("from", "email", "content")
	VALUES (
		myRecord->>'from',
		myRecord->>'email',
		myRecord->>'content'
	) RETURNING id
$$ LANGUAGE SQL STRICT;


-- Avatar function

CREATE FUNCTION new_avatar(myRecord json) RETURNS int AS $$
	INSERT INTO "avatar" ("name", "url")
	VALUES (
		myRecord->>'name',
		myRecord->>'url'
	) RETURNING id
$$ LANGUAGE SQL STRICT;


-- Image function

CREATE FUNCTION new_image(myRecord json) RETURNS int AS $$
	INSERT INTO "image" ("name", "url")
	VALUES (
		myRecord->>'name',
		myRecord->>'url'
	) RETURNING id
$$ LANGUAGE SQL STRICT;


-- Techno function 

CREATE FUNCTION new_techno(myRecord json) RETURNS int AS $$
	INSERT INTO "techno" ("name", "image")
	VALUES (
		myRecord->>'name',
		myRecord->>'image'
	) RETURNING id
$$ LANGUAGE SQL STRICT;


-- Project_techno functions

CREATE FUNCTION new_project_techno(myRecord json) RETURNS void AS $$
	INSERT INTO "project_techno" ("project_id", "techno_id")
	VALUES (
		(myRecord->>'project_id')::int,
		(myRecord->>'techno_id')::int
	)
$$ LANGUAGE SQL STRICT;

COMMIT;
