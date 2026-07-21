# Online Booking Platform — Frontend

A React-based frontend for an online booking platform where users can browse properties, create accounts, manage bookings, make payments, and interact with the application in multiple languages.

## Technologies

* React
* React Router
* React Context API
* Axios
* CSS Modules / Custom CSS
* react-scripts (Create React App)



## Features

### User Features

* User registration
* User login/logout
* Session-based authentication
* Protected user pages
* Browse available properties
* View property details
* Create bookings
* View personal bookings
* Contact form
* Multi-language support

  * German
  * English
  * Spanish
* Light/Dark theme support

### Payment Features

* Stripe Checkout integration
* Booking payment flow
* Success and cancellation pages

### Admin Features

* Admin dashboard
* Protected admin route
* View users
* Booking management tools
* Export booking data


##  Project Structure

```
src/
│
├── components/
│   ├── Navbar.js
│   ├── ProtectedRoute.js
│   ├── AdminRoute.js
│   ├── ErrorBoundary.js
│   └── Comment components
│
├── context/
│   ├── AuthContext.js
│   ├── LanguageContext.js
│   └── ThemeContext.js
│
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── PropertyDetail.js
│   ├── MyBookings.js
│   ├── AdminDashboard.js
│   ├── Success.js
│   └── Cancel.js
│
├── styles/
│   ├── navbar.css
│   ├── buttons.css
│   ├── forms.css
│   ├── pages.css
│   └──...
│
├── App.js
└── index.js
```


##  Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will run locally at:

```
http://localhost:3000
```



## 🔐 Authentication

The frontend communicates with a PHP backend using session-based authentication.

Authentication flow:

```
React Frontend
      |
      |
      v
PHP Backend
      |
      |
      v
PHP Session Cookie
      |
      |
      v
AuthContext
```

Protected pages use:

* `ProtectedRoute`
* `AdminRoute`

## 📦 Available Scripts

### Start development server

```bash
npm start
```

Runs the application in development mode.

### Create production build

```bash
npm run build
```

Creates an optimized production build.

### Run tests

```bash
npm test
```

##  Deployment

The frontend can be deployed on platforms such as:

* Render
* Netlify
* Vercel

For production deployment, create the build:

```bash
npm run build
```

and deploy the generated `build` folder.

##  Security

Implemented security measures include:

* CSRF protection
* Protected routes
* Secure session cookies
* Input validation
* Error boundaries
* API request protection

##  Backend

The frontend requires the booking platform backend API.

Backend responsibilities:

* User authentication
* Property management
* Booking creation
* Payment processing
* Database operations
* Admin operations

## 📄 License

This project is for educational and development purposes.
