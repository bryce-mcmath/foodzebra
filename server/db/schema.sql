DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "MenuItem" CASCADE;
DROP TABLE IF EXISTS "OrderItem" CASCADE;

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255),
  "role" VARCHAR(255) NOT NULL,
  "mobile" VARCHAR(255),
  "password" VARCHAR(255),
  "deleted_at" TIMESTAMP
);

CREATE TABLE "Order" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "pickup_name" VARCHAR(255) NOT NULL,
  "customer_note" VARCHAR(255),
  "mobile" VARCHAR(255),
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "estimate" INTEGER,
  "total_price" SMALLINT NOT NULL,
  "accepted_at" TIMESTAMP,
  "fulfilled_at" TIMESTAMP,
  "deleted_at" TIMESTAMP,
  "user_id" INTEGER DEFAULT 0 REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "MenuItem" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "desc" TEXT,
  "price" SMALLINT NOT NULL,
  "img_url" VARCHAR(255),
  "deleted_at" TIMESTAMP,
  "category" VARCHAR(255) DEFAULT 'mains'
);

CREATE TABLE "OrderItem" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "order_id" INTEGER NOT NULL,
  "menu_item_id" INTEGER NOT NULL
);