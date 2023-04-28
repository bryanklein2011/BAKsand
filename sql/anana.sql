DROP TABLE IF EXISTS "like";
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS tweet;


DROP TABLE IF EXISTS "ticketStatus";
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS profile;


CREATE TABLE IF NOT EXISTS profile (
    profile_id UUID NOT NULL,
    profile_about_me VARCHAR(512),
    profile_email VARCHAR (64) NOT NULL,
    profile_hash CHAR (97) NOT NULL,
    profile_name VARCHAR(32) NOT NULL,
    UNIQUE (profile_email),
    UNIQUE (profile_name),
    PRIMARY KEY (profile_id)
    );

CREATE INDEX ON profile ("profile_email");

CREATE TABLE IF NOT EXISTS project (
    project_id UUID NOT NULL,
    project_profile_id UUID NOT NULL,
    project_due_date timestamptz NOT NULL,
    project_description VARCHAR(512) NOT NULL,
    project_name VARCHAR(32) NOT NULL,
    PRIMARY KEY (project_id),
    FOREIGN KEY (project_profile_id) REFERENCES profile(profile_id)
    );

CREATE INDEX ON project ("project_profile_id");

CREATE TABLE IF NOT EXISTS ticket (
    ticket_id UUID NOT NULL,
    ticket_profile_id UUID NOT NULL,
    ticket_project_id UUID NOT NULL,
    ticket_description VARCHAR(512) NOT NULL,
    ticket_due_date timestamptz NOT NULL,
    ticket_name VARCHAR(32) NOT NULL,
    PRIMARY KEY (ticket_id),
    FOREIGN KEY (ticket_profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (ticket_project_id) REFERENCES project(project_id)
    );

CREATE INDEX ON ticket(ticket_project_id);
CREATE INDEX ON ticket(ticket_profile_id);

CREATE TABLE IF NOT EXISTS status(
    status_id UUID NOT NULL,
    status_value VARCHAR(32) NOT NULL,
    status_color CHAR(6) NOT NULL,
    PRIMARY KEY (status_id)
    );

CREATE TABLE IF NOT EXISTS ticket_status (
    ticket_status_status_id  UUID NOT NULL,
    ticket_status_ticket_id UUID NOT NULL,
    ticket_status_date timestamptz NOT NULL,
    FOREIGN KEY (ticket_status_status_id) REFERENCES status(status_id),
    FOREIGN KEY (ticket_status_ticket_id) REFERENCES ticket(ticket_id),
    PRIMARY KEY (ticket_status_status_id, ticket_status_ticket_id)
    );

CREATE INDEX ON ticket_status (ticket_status_status_id);
CREATE INDEX ON ticket_status (ticket_status_ticket_id);