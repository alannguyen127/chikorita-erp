# CHIKORITA ERP

## I'm owing an eatclean restaurant named Chikorita Eatclean. This application was built for managing my restaurant's operation.

### Init Project

- Install React, Redux

```
npm install react react-dom redux
```

- Install libraries

```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/lab
npm install react-router-dom react-hook-form @hookform/resolvers yup
npm install axios numeral lodash jwt-decode change-case
npm install react-markdown rehype-raw date-fns react-dropzone react-toastify
```

### Project Description:

Chikorita ERP is a comprehensive Enterprise Resource Planning (ERP) system designed specifically for EatClean online restaurants. The platform integrates multiple operational functions such as customer management, order processing, delivery tracking, kitchen management, and inventory control into a seamless system. Chikorita ERP streamlines day-to-day operations, ensuring restaurants can efficiently manage their workflows, improve customer satisfaction, and optimize their supply chains.

Built with modern web technologies, the platform offers real-time updates, intuitive user interfaces, and scalable architecture, making it ideal for restaurants of all sizes.

<!-- ### User Story:

#### As a Restaurant Owner (Admin):

1. I want to manage customer information so that I can view customer profiles, track order history, and analyze customer behavior to tailor promotions and improve retention.
2. I want to monitor daily sales, inventory levels, and kitchen activity in a real-time dashboard so that I can make informed decisions on staffing, inventory purchases, and delivery performance.
3. I want to generate detailed reports on sales, customer satisfaction, and inventory usage over a specific time period so that I can evaluate business performance and strategize for future growth.
4. I want to be notified when certain ingredients are running low so that I can reorder stock in time to avoid kitchen delays or menu shortages.
5. I want to assign specific staff roles and permissions within the system (e.g., kitchen staff, delivery team) so that each team member has access to the relevant modules and functionalities for their job.

#### As a Customer Service Staff (Member):

1. I want to view and manage all customer orders (new, pending, completed, cancelled) so that I can ensure they are processed efficiently and minimize errors.
2. I want to assign orders to the kitchen and track their progress in real-time so that customers can be updated on the status of their orders.
3. I want to handle customer inquiries regarding their orders (e.g., changing the order, delivery address, or handling complaints) so that I can provide excellent customer service.
4. I want to notify customers when their orders are ready for pickup or out for delivery so that they know when to expect their meal. -->

### API Endponts:

#### Customer Management:

- GET /api/customers: Fetch all customer data.
- GET /api/customers/{id}: Fetch specific customer details by ID.
- POST /api/customers: Create a new customer record.
- PUT /api/customers/{id}: Update an existing customer record.
- DELETE /api/customers/{id}: Delete a customer.

#### Order Management

- GET /api/orders: Retrieve all orders.
- GET /api/orders/{id}: Get order details by order ID.
- POST /api/orders: Create a new order.
- PUT /api/orders/{id}: Update an existing order.
- DELETE /api/orders/{id}: Cancel or delete an order.
