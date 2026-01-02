# Contact Management Web App - MERN Stack

Complete working implementation of a contact management system built with React (Vite), Express, MongoDB, and Node.js.

## Project Structure

```
Contact_management_web_app/
├── backend/
│   ├── models/
│   │   └── Contact.js          # Mongoose schema
│   ├── routes/
│   │   └── contactRoutes.js    # API endpoints
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Prerequisites

- Node.js (v16+)
- MongoDB running locally on `mongodb://localhost:27017/`
- npm or yarn

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Ensure MongoDB is Running

- MongoDB must be running on `mongodb://localhost:27017/`
- Or update `.env` file with your MongoDB URI

### 3. Start Server

```bash
npm start
```

- Server runs on `http://localhost:5000`
- Log: "Server running on port 5000" and "MongoDB connected"

### Backend API Endpoints

- **POST** `/api/contacts` - Create a new contact

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 000-0000",
    "message": "Optional message"
  }
  ```

- **GET** `/api/contacts` - Fetch all contacts (sorted by newest first)

- **DELETE** `/api/contacts/:id` - Delete a contact

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

- Frontend runs on `http://localhost:5173`
- Automatically proxies `/api` calls to backend on `http://localhost:5000`

### 3. Build for Production

```bash
npm run build
```

- Output in `dist/` directory

## Features Implemented

✅ **Contact Form**

- Controlled inputs with client-side validation
- Required fields: Name, Email, Phone
- Email format validation
- Optional message field
- Inline error messages
- Submit button disabled when invalid
- Success message on submission
- Form resets after successful submit

✅ **Backend API**

- RESTful endpoints with proper HTTP status codes
- Async/await patterns
- MongoDB Mongoose schema with validation
- Timestamps on all contacts
- Contacts sorted by newest first

✅ **Display Contacts**

- Fetches on page load
- Responsive table layout
- Mobile-friendly grid layout
- Delete functionality with confirmation
- Real-time UI updates (no page reload)
- Total contact count

✅ **UI & UX**

- Tailwind CSS styling (latest version)
- Responsive design (mobile + desktop)
- Accessible form inputs with labels
- Clear button disabled state
- Clean, minimal interface
- Error and success message display

## Key Code Points

### Frontend State Management

- Uses `useState` and `useEffect` only
- Form validation logic in `ContactForm.jsx`
- Data fetching in `ContactList.jsx`
- Parent-child communication via props

### Backend Validation

- Email regex validation at schema level
- Required field enforcement
- Proper error handling with try-catch
- Status codes: 201 (created), 200 (success), 400 (bad request), 404 (not found), 500 (server error)

### Database

- Mongoose schema with timestamps
- MongoDB auto-indexing for efficient queries
- Sorted by `createdAt` descending

## Troubleshooting

**"MongoDB connection failed"**

- Ensure MongoDB is running: `mongod`
- Check `.env` file has correct `MONGODB_URI`

**"Cannot connect to localhost:5000"**

- Backend must be running: `npm start` in `/backend`

**Form submission fails**

- Check backend server is running
- Verify proxy in `vite.config.js` points to correct backend port

**Styling not showing**

- Ensure Tailwind CSS build process is complete
- Restart dev server: `npm run dev`

## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/contact_management
PORT=5000
```

## Development Tips

- Frontend dev server auto-reloads on file changes
- Backend requires manual restart (or use `npm run dev` with nodemon)
- MongoDB data persists in `~/data/db` by default
- All validation happens client-side first, then server-side for security

## Time Complexity

This implementation prioritizes:

1. Working, functional code
2. Minimal dependencies
3. Clean, readable structure
4. Interview-friendly patterns

No over-engineering, no unnecessary abstractions.
