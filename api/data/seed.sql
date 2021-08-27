BEGIN;

INSERT INTO "avatar" ("name", "url") VALUES
('Eric Cartman','https://static.wikia.nocookie.net/southpark-fr/images/9/9e/Eric_cartman.png/revision/latest?cb=20151010161607&path-prefix=fr'),
('Rick Sanchez','https://static.wikia.nocookie.net/rick-et-morty/images/a/a6/Rick_Sanchez.png/revision/latest/top-crop/width/360/height/450?cb=20170726160155&path-prefix=fr'),
('Leela Turanga','https://static.wikia.nocookie.net/enfuturama/images/9/9e/Cast_futurama_turangaleela.jpg/revision/latest/top-crop/width/360/height/360?cb=20210809013632'),
('Lisa Simpson','https://static.wikia.nocookie.net/les-simpson-springfield/images/5/59/Lisa.png/revision/latest?cb=20141223033040&path-prefix=fr');

INSERT INTO "user" ("first_name", "last_name", "email", "password", "avatar_id") VALUES
('Gilfoyle', 'Bertram', 'gilfoyle@siliconvalley.com', 'qwerty', 2);

INSERT INTO "image" ("name", "url") VALUES
('Laptop on desk', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80'),
('Toronto skyline', 'https://images.unsplash.com/photo-1507992781348-310259076fe0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'),
('Canadian landscape', 'https://images.unsplash.com/photo-1513564774965-ac25ddf81e1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'),
('Basketball hoop', 'https://images.unsplash.com/photo-1493078640264-28e9ec0ae9ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');

INSERT INTO "techno" ("name", "image") VALUES 
('Javascript','https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png'),
('Node.js','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png'),
('PostgreSQL','https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png'),
('Vue.js','https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/555px-Vue.js_Logo_2.svg.png');

INSERT INTO "post" ("title", "subtitle", "content", "user_id", "image_id") VALUES
('Come to Toronto', 'Where the dreams begin...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla sollicitudin erat tincidunt pulvinar. Etiam lectus dolor, aliquet a sollicitudin sed, tempor in purus. Mauris ac nulla vel tellus sagittis vestibulum. Nam et magna ut elit lacinia laoreet ac in felis. Maecenas ac tellus neque. Proin sed urna nibh. Mauris magna metus, ultricies quis nisi sed, pellentesque mollis ipsum. Vestibulum ornare faucibus lorem vel laoreet. Curabitur ultrices blandit pretium.', 1, 2),
('To the hoop', 'Reach your goals', 'Pellentesque et sem et risus commodo bibendum pharetra sed massa. Vivamus luctus aliquam pellentesque. Pellentesque fermentum ante at velit fringilla, vel convallis risus eleifend. Integer vel dolor eu magna molestie pharetra. Pellentesque imperdiet ipsum vitae sagittis consectetur. Suspendisse a libero vulputate, faucibus risus at, condimentum lectus. Etiam vehicula venenatis velit quis vulputate. Vivamus consectetur risus magna, eu rhoncus nulla placerat in. Etiam dignissim convallis eros, in mattis nunc maximus nec. Vestibulum metus ante, tempor elementum nunc in, mollis faucibus nibh. Maecenas enim erat, placerat posuere rhoncus quis, tristique eget erat. Maecenas ligula tellus, consectetur non ante eget, mollis consectetur velit. Aenean auctor scelerisque hendrerit.', 1, 4);

INSERT INTO "project" ("title", "content", "github_link", "web_link", "user_id", "image_id") VALUES
('My first project', 'Vestibulum vitae vestibulum risus. Suspendisse ullamcorper sagittis turpis eget rutrum. Mauris a facilisis justo. Nullam tristique interdum pretium. Sed accumsan tempus lectus, et vulputate arcu mollis eu. Etiam at purus id orci elementum tincidunt iaculis pharetra mauris. Donec ac nisl facilisis, ultricies turpis sit amet, eleifend augue. Quisque finibus tempor enim eu semper. Vivamus sit amet libero vel tortor aliquam tempor. Vestibulum purus turpis, imperdiet eget ligula eget, consectetur ultricies nunc. Suspendisse condimentum nisl eget sagittis semper. Sed leo libero, feugiat ut dolor sit amet, tempus pulvinar dolor. Praesent sem nisi, tincidunt in velit vel, fringilla commodo magna. Curabitur consectetur semper ultrices. In tempus tellus vel vulputate posuere.', 'github', 'web', 1, 1),
('My second project', 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean gravida turpis dictum, fermentum lectus vitae, bibendum erat. Vestibulum sit amet ornare ipsum. Sed a semper nunc, a varius eros. Quisque consequat nisl non libero interdum blandit. Nunc libero libero, consectetur eu augue at, volutpat dictum neque. In pellentesque augue quam, eget pulvinar lorem iaculis a. Aenean mi arcu, pellentesque sed pellentesque accumsan, pharetra quis diam. Donec ultrices ipsum ornare, mollis nisl nec, dictum sapien. Aliquam bibendum felis mattis hendrerit pellentesque.', 'github', 'web', 1, 3);

INSERT INTO "project_techno" ("project_id", "techno_id") VALUES
(1,1),
(1,4),
(2,2),
(2,3);

INSERT INTO "message" ("from", "email", "content") VALUES
('John Doe', 'john@doe.com', 'Nunc mollis ipsum vel tortor scelerisque accumsan. Maecenas neque elit, gravida sit amet pellentesque eu, lacinia ac est. Nunc ac arcu sed elit ornare molestie at at mauris. Integer nunc risus, venenatis ut augue et, malesuada hendrerit sapien. Morbi eget porttitor est. Nunc malesuada tempus interdum. Quisque sapien orci, egestas sed aliquam a, tempor id dui. Curabitur vel orci metus. Vestibulum quam enim, feugiat nec condimentum quis, volutpat at odio. Phasellus dictum tempor lorem, id sollicitudin tortor elementum quis. Vestibulum tincidunt, orci eu fermentum rutrum, erat lacus commodo mi, in faucibus augue sem in orci. Phasellus non massa sed metus hendrerit pulvinar. Aenean et consectetur lacus. Etiam dictum magna nunc, et porttitor metus consectetur ut.'),
('Dirk Test', 'test@mail.org', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida lorem dapibus mi euismod gravida. Morbi tincidunt ex sit amet neque pulvinar iaculis. Sed mollis id enim id suscipit. Sed dignissim eros non ipsum iaculis commodo. Phasellus felis sapien, pharetra eget orci ac, porttitor efficitur tortor. Quisque fringilla leo elit, eu ultricies nunc facilisis sed. Phasellus enim metus, ultricies in mollis ac, sodales pellentesque massa. Etiam quis aliquam libero. Vivamus vulputate, quam nec feugiat mattis, odio metus consequat odio, vitae efficitur tortor elit in diam. Aliquam eget eros id tortor rutrum tincidunt a sit amet nisi. Nulla at ex orci. Aliquam sit amet enim ut felis posuere sollicitudin. Suspendisse augue nisi, pharetra molestie volutpat et, pulvinar eu enim.'),
('April ONeil', 'april@chanel3.com', 'Vivamus pulvinar ipsum non dui hendrerit pharetra. Nulla ut faucibus neque, quis iaculis erat. Donec augue nisl, varius id facilisis vitae, bibendum at massa. Pellentesque volutpat eget urna eget blandit. Maecenas lacinia lacus sed orci imperdiet, et volutpat risus finibus. Fusce vitae ante turpis. Praesent nibh leo, fringilla nec dolor eu, iaculis dignissim mi. Praesent finibus vitae quam quis fringilla. Nulla condimentum, turpis id sollicitudin convallis, nisl purus auctor sapien, vitae semper libero enim eu nibh. Cras sed purus mauris. Nulla lacus nunc, mattis et fermentum non, efficitur at massa. Morbi feugiat, lectus eget sollicitudin fringilla, risus nisl laoreet quam, vel faucibus magna lorem et lorem. Aliquam sollicitudin molestie massa, et porta quam scelerisque malesuada. Phasellus bibendum urna nisi, ut semper tortor tristique eu. Aenean id mauris at ex fermentum suscipit. In ultricies semper est sed maximus.');

COMMIT;