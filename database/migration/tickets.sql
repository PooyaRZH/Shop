CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,
    main_ticket_id INTEGER,

    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    -- subject VARCHAR(255) NOT NULL,
    -- status ticket_status NOT NULL DEFAULT 'open',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tickets_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tickets_main_ticket
        FOREIGN KEY (main_ticket_id)
        REFERENCES tickets(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_tickets_user_id
ON tickets(user_id);

CREATE INDEX idx_tickets_main_ticket_id
ON tickets(main_ticket_id);