# Planning Document

## User Stories

### MVP

As a customer I can...

- select menu items
- add/delete menu items to my cart
- view my cart
- add a pickup name and note to my cart
- checkout my cart
- recieve SMS notification of order acceptance
- recieve SMS notification of order completion
- view my current order and details (via unique url)

As a operator, I can...

- log in
- view all orders
- view single order
- send SMS notifications on acceptance and completion
  - input time estimate

### Stretch

As a user, I can...

- view menu items by category (mains, appetizers, etc.)
- search for menu items (by category as well as text)
- register/login
- choose whether or not to recieve completion SMS notification

As a operator, I can...

- register/login
- add/remove menu items
- send custom SMS notifications
- view orders history

## Entity Relationship Diagram

![ERD](https://raw.githubusercontent.com/bryce-mcmath/foodzebra/master/docs/ERD.PNG)

## Routes

### MVP

- /
  - GET -> render homepage
- /menu
  - GET -> retrieve menu items
- /login
  - POST -> sets cookie, redirects
- /logout
  - DELETE -> removes cookie, redirects
- /orders
  - GET -> retrieves all orders
  - POST -> add order to db
- /orders/:id
  - GET -> retrieves specific order
  - PUT -> update order
  - DELETE -> delete order

### Stretch

- /register
  - POST -> create a new account, set cookie
- /menu
  - POST -> add menu item
- /menu/:id
  - PUT -> update menu item
  - DELETE -> delete menu item

## Wireframes

### MVP

- Customer
  - Landing
  - Menu item modal
  - Cart modal
  - Payment modal
- Operator
  - Landing shows orders
  - Order modal

### Stretch

- Common
  - Register modal
  - Login modal
- Customer
  - Profile modal
- Operator
  - Menu page
  - Add menu item modal
  - Edit menu item modal
