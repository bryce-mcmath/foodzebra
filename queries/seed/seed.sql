INSERT INTO "User" (
  name,
  email,
  role,
  mobile,
  password) 
VALUES 
('Wilson Wong', "wilwong89@gmail.com", 'customer', '250 896 8729', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bryce McMath', "bryce.j.mcmath@gmail.com", 'operator', '250 896 8729', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO "Order" (
  pickup_name,
  customer_note,
  created_at,
  estimate,
  total_price,
  accepted_at,
  deleted_at,
  user_id) 
VALUES 
('Wilson Wong', "I don't like pickles", now(), NULL, 1989, NULL, NULL, 1);

INSERT INTO "MenuItem" (
  name,
  "desc",
  price,
  img_url,
  deleted_at) 
VALUES 
('Pizza', "Pepperoni, cheese, tomato sauce, just like a mama used ta make", 999, "https://i.imgur.com/YPacqGc.jpg", NULL),
("Fries", "French fried purtaters", 599, "https://i.imgur.com/HTtLQol.jpg", NULL),
("Pasta", "Ah spaghett", 999, "https://i.imgur.com/HMVBN9l.jpg", NULL);

INSERT INTO "OrderItem" (
  order_id,
  menu_item_id
) 
VALUE
(1, 1),
(1, 1),
(1, 2),
(1, 3);