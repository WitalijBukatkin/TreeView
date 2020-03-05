/*
 * Copyright (c) 2020. Witalij Bukatkin
 * Github profile: https://github.com/witalijbukatkin
 */

ALTER SEQUENCE hibernate_sequence RESTART 10000;

CREATE UNIQUE INDEX ON node_children (children_id, node_id);

insert into node
values (0, '/', null);
insert into node
values (1, 'home', 0);
insert into node
values (2, 'vitalijbukatkin', 1);
insert into node
values (3, 'Documents', 2);
insert into node
values (4, 'Desktop', 2);
insert into node
values (5, 'Downloads', 2);
insert into node
values (6, 'photo.png', 4);
insert into node
values (7, 'book.pdf', 5);
insert into node
values (8, 'document.odt', 3);

insert into node_children
values (0, 1);
insert into node_children
values (1, 2);
insert into node_children
values (2, 3);
insert into node_children
values (2, 4);
insert into node_children
values (2, 5);
insert into node_children
values (3, 8);
insert into node_children
values (4, 6);
insert into node_children
values (5, 7);