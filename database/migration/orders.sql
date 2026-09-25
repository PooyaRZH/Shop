CREATE TYPE order_status AS ENUM (
    'pending',
    'paid',
    'cancelled'
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,

    user_id INT NOT NULL,
    address_id INT NOT NULL,

    status order_status NOT NULL DEFAULT 'pending',

    total_price BIGINT NOT NULL CHECK (total_price >= 0),

    paid_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_orders_address
        FOREIGN KEY (address_id)
        REFERENCES addresses(id)
);  