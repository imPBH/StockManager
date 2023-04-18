CREATE TABLE IF NOT EXISTS "users"
(
    id_user INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "companies"
(
    id_company INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "users_companies"
(
    id_user_company INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_user INTEGER NOT NULL,
    id_company INTEGER NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id_user),
    FOREIGN KEY(id_company) REFERENCES companies(id_company)
);

CREATE TABLE IF NOT EXISTS "warehouses"
(
    id_warehouse INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    id_company INTEGER NOT NULL,
    FOREIGN KEY(id_company) REFERENCES companies(id_company)
);

CREATE TABLE IF NOT EXISTS "companies_warehouses"
(
    id_company_warehouse INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_company INTEGER NOT NULL,
    id_warehouse INTEGER NOT NULL,
    FOREIGN KEY(id_company) REFERENCES companies(id_company),
    FOREIGN KEY(id_warehouse) REFERENCES warehouses(id_warehouse)
);

CREATE TABLE IF NOT EXISTS "items_references"
(
    id_reference INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    barcode_value INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS "companies_references"
(
    id_company_reference INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_company INTEGER NOT NULL,
    id_reference INTEGER NOT NULL,
    FOREIGN KEY(id_company) REFERENCES companies(id_company),
    FOREIGN KEY(id_reference) REFERENCES items_references(id_reference)
);

CREATE TABLE IF NOT EXISTS "articles"
(
    id_article INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_reference INTEGER NOT NULL,
    expiration TEXT,
    FOREIGN KEY(id_reference) REFERENCES items_references(id_reference)
);

CREATE TABLE IF NOT EXISTS "sales"
(
    id_sale INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "sales_items"
(
    id_sale_item INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_sale INTEGER NOT NULL,
    id_article INTEGER NOT NULL,
    FOREIGN KEY(id_sale) REFERENCES sales(id_sale),
    FOREIGN KEY(id_article) REFERENCES articles(id_article)
);

CREATE TABLE IF NOT EXISTS "orders"
(
    id_order INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders_items"
(
    id_order_item INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_order INTEGER NOT NULL,
    id_reference INTEGER NOT NULL,
    FOREIGN KEY(id_order) REFERENCES orders(id_order),
    FOREIGN KEY(id_reference) REFERENCES items_references(id_reference)
);