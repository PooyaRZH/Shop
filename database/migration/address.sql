CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,

    province VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    receiver_mobile VARCHAR(20) NOT NULL,
    display_name VARCHAR(50),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_addresses_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE INDEX idx_addresses_user_id
ON addresses(user_id);





-- id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ----> jadid tar va behtar


-- CONSTRAINT fk_addresses_user ----> ejbari nist ama baraye hazf ba in query lazem ast : 
    -- ALTER TABLE addresses
    -- DROP CONSTRAINT fk_addresses_user;





-- baraye kar kardan updated_at :

    -- CREATE OR REPLACE FUNCTION update_updated_at()
    -- RETURNS TRIGGER AS $$
    -- BEGIN
    --     NEW.updated_at = CURRENT_TIMESTAMP;
    --     RETURN NEW;
    -- END;
    -- $$ LANGUAGE plpgsql;

    -- CREATE TRIGGER users_updated_at
    -- BEFORE UPDATE ON users
    -- FOR EACH ROW
    -- EXECUTE FUNCTION update_updated_at();

    -- CREATE TRIGGER addresses_updated_at
    -- BEFORE UPDATE ON addresses
    -- FOR EACH ROW
    -- EXECUTE FUNCTION update_updated_at();