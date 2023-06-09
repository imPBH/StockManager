CREATE TABLE IF NOT EXISTS "users"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "companies"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "users_companies"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_user INTEGER NOT NULL,
    id_company INTEGER NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id),
    FOREIGN KEY(id_company) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS "warehouses"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    id_company INTEGER NOT NULL,
    FOREIGN KEY(id_company) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS "items_references"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    barcode_value TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS "companies_references"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_company INTEGER NOT NULL,
    id_reference INTEGER NOT NULL,
    FOREIGN KEY(id_company) REFERENCES companies(id),
    FOREIGN KEY(id_reference) REFERENCES items_references(id)
);

CREATE TABLE IF NOT EXISTS "articles"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_reference INTEGER NOT NULL,
    id_warehouse INTEGER,
    expiration TEXT,
    FOREIGN KEY(id_reference) REFERENCES items_references(id),
    FOREIGN KEY(id_warehouse) REFERENCES warehouses(id)
);

CREATE TABLE IF NOT EXISTS "orders"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders_items"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_order INTEGER NOT NULL,
    id_reference INTEGER NOT NULL,
    FOREIGN KEY(id_order) REFERENCES orders(id),
    FOREIGN KEY(id_reference) REFERENCES items_references(id)
);

CREATE TABLE IF NOT EXISTS "sales"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_company INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(id_company) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS "sales_items"
(
    id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_sale INTEGER NOT NULL,
    id_article INTEGER NOT NULL,
    FOREIGN KEY(id_sale) REFERENCES sales(id),
    FOREIGN KEY(id_article) REFERENCES articles(id)
);