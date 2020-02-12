INSERT INTO "User" (
  "name",
  "email",
  "role",
  "mobile",
  "password") 
VALUES 
('Wilson Wong', 'wilwong89@gmail.com', 'customer', '250 896 8729', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bryce McMath', 'bryce.j.mcmath@gmail.com', 'operator', '250 896 8729', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO "Order" (
  "pickup_name",
  "customer_note",
  "created_at",
  "estimate",
  "total_price",
  "accepted_at",
  "fulfilled_at",
  "deleted_at",
  "user_id") 
VALUES 
('Wilson Wong', 'I do not like pickles', now(), NULL, 1989, NULL, NULL, NULL, 1);

INSERT INTO "MenuItem" (
  "name",
  "desc",
  "price",
  "img_url",
  "deleted_at",
  "category") 
VALUES 
('West Coast Clam Chowder', 'A creamy milk based soup loaded with tons of locally sourced clams and fresh potatoes chunks', 1450, 'https://images.unsplash.com/photo-1560684352-8497838a2229?auto=compress&h=200', NULL, 'mains'),
('Beef Tenderloin Ramen', 'Natural Heritage Berkshire beef broth soup topped with roast beef tenderloin slices, bamboo shoots, kikurage mushrooms, red ginger, chopped scallions and a seasoned boiled egg.', 1650, 'https://images.unsplash.com/photo-1568096889942-6eedde686635?auto=compress&h=200', NULL, 'appetizers'),
('Sushi Variety Platter', 'Six rolls of Aburi Salmon Oshi – pressed BC wild sockeye salmon, jalapeño with Miku sauce - six rolls of Aburi Ebi Oshi – pressed prawn, lime zest with ume sauce - four rolls of Aburi Saba Oshi – pressed house-cured mackerel with miso sauce - four Miku rolls – salmon, crab, uni, cucumber, rolled in tobiko with Miku sauce.', 2450, 'https://images.unsplash.com/photo-1581331474665-a0bbee7dfba9?auto=compress&h=200', NULL, 'mains'),
('Seafood Platter', 'A four oz. piece of cod, shrimp, scallops, and a crab cake broiled in white wine and butter with a special blend of seasonings.', 1450, 'https://images.unsplash.com/photo-1519351635902-7c60d09cb2ed?auto=compress&h=200', NULL, 'mains'),
('Linguini and Clams', 'Linguini pasta served with 8 sauteed clams with a light and creamy white wine sauce', 1450, 'https://images.unsplash.com/photo-1539586345401-51d5bfba7ac0?auto=compress&h=200', NULL, 'mains'),
('Smoked Baby Back Ribs', 'A full rack of baby-back ribs seasoned with a custom rub and simmered in Sweet Baby Rays BBQ sauce.', 1450, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=compress&h=200', NULL, 'mains'),
('Sesame Chicken Wings', 'Six wings served hot, drenched in old bay sesame seasoning. Celery sticks and blue cheese accompanies.', 899, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=compress&h=200', NULL, 'appetizers'),
('Crabby Pretzel', 'Toasted pretzel with our signature crab cheese dip. Sounds terrible right? It is.', 799, 'https://images.unsplash.com/photo-1569546736020-c04a1332e362?auto=compress&h=200', NULL, 'appetizers'),
('Calamari', 'Lightly breaded fresh calamari. Served with homemade marinara.', 1199, 'https://images.unsplash.com/photo-1579723669117-62211a4ed0c7?auto=compress&h=200', NULL, 'appetizers'),
('Coca Cola', 'The classic drink, served ice cold in the classic bottle.', 399, 'https://images.unsplash.com/photo-1561758033-48d52648ae8b?auto=compress&h=200', NULL, 'drinks'),
('Water', 'Literally just water. You will die without this. Buy now.', 199, 'https://images.unsplash.com/photo-1516888892881-aad840c56db2?auto=compress', NULL, 'drinks'),
('Sparkling Water', 'Water 2: With Bubbles This Time', 4000, 'https://images.unsplash.com/photo-1551753103-f121bd83be46?auto=compress&h=200', NULL, 'drinks');

INSERT INTO "OrderItem" (
  "order_id",
  "menu_item_id"
) 
VALUES
(1, 1),
(1, 1),
(1, 2),
(1, 3),
(1, 4);