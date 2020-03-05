/*
 * Copyright (c) 2020. Witalij Bukatkin
 * Github profile: https://github.com/witalijbukatkin
 */

CREATE SEQUENCE hibernate_sequence START 10000;

create table node
(
    id        integer not null,
    value     varchar(255),
    parent_id integer,
    primary key (id)
);

create table node_children
(
    node_id     integer not null,
    children_id integer not null
);

CREATE UNIQUE INDEX ON node_children (children_id, node_id);

ALTER TABLE node
    ADD FOREIGN KEY (parent_id) REFERENCES node ON DELETE CASCADE;

ALTER TABLE node_children
    ADD FOREIGN KEY (children_id) REFERENCES node ON DELETE CASCADE;

ALTER TABLE node_children
    ADD FOREIGN KEY (node_id) REFERENCES node ON DELETE CASCADE;