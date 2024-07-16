# Travel-Joy

## Project Description
Travel Joy is a web application designed to promote tourism in Romania. The application focuses on two key aspects: accommodations and vacation packages. The homepage serves as the initial filter for users, allowing them to select the city they wish to explore for accommodations or vacation packages. Upon selection, users are directed to a new page displaying all available accommodations/packages in that city, where they can further refine their search by specifying check-in/check-out dates and the number of guests. For vacation packages, the next step involves selecting one of the available packages and proceeding to the payment page, which requires authentication. If not authenticated, users are redirected to the login page. For accommodations, after selecting the desired hotel, users are directed to a page displaying all available rooms. Upon selecting a room, users are redirected to the payment page, with the same authentication requirement. In case a user has an existing account but has forgotten their password, they can click on the "Forgot password" button, and a password reset email valid for 15 minutes will be sent to their registered email address. Payment processing is implemented using Stripe, and currently, we are conducting testing using a demo account provided by Stripe, simulating real transactions. Additionally, we provide a Contact page where users can leave feedback, and an "About Us" page with information about Travel Joy. When users are logged in, a new "My Account" page appears, allowing users to change their name, password, or deactivate their account.

## Technologies Used
- **React**
- **Bootstrap**
- **Spring Boot**
- **Spring Security**
- **PostgreSQL**
- **Stripe**

## Setup
Clone the repository to your local machine.

### Server side

#### .env file
Copy the .env.example as .env and fill up the environment variable for your personal SQL database connecttion, Stripe services and Gmail messaging.

Run the TouristsParadiseApplication

### Client side

#### Install dependencies

```bash
cd frontend/travel
npm install
```

#### Runnig the code

```bash
cd frontend/travel
npm start
```

And the create-react-app react-scripts package will start the app on your browser.

## Demo 
https://github.com/user-attachments/assets/8fec95d7-f77a-4e2f-bf9b-5321c01cf948

## Admin Panel Demo

https://github.com/user-attachments/assets/45b05f23-9aa2-4ed8-8b09-f16e3cf439a3


