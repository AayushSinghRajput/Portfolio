# Aayush Singh Rajput Portfolio

A modern, responsive personal portfolio website showcasing my skills, projects, and experience as a web developer.

## Project Overview

This portfolio website is built as a single-page application with multiple sections:
- Hero section with introduction
- About me
- Skills and technologies
- Projects showcase
- Work experience
- Contact form
- Footer with social links

## Technologies Used

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library built with Radix UI
- **React Router** - For navigation
- **React Query** - For data fetching and state management
- **React Hook Form** - For form handling with validation

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## Features

- **Responsive Design** - Optimized for all screen sizes
- **Dark/Light Mode** - Toggle between color schemes
- **Animations** - Smooth scrolling and fade-in effects
- **Contact Form** - Send messages directly from the website
- **Resume Download** - PDF resume available for download
- **Project Gallery** - Showcasing my development work
- **Skills Showcase** - Visual representation of technical skills

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager
- MongoDB account (for contact form functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/AayushSinghRajput/Portfolio.git

# Navigate to the project directory
cd aayush-codes-web

# Install frontend dependencies
npm install

# Setup environment variables
# Create a .env file in the root directory with your configuration

# Start the frontend development server
npm run dev

# For backend development (optional)
cd backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root of the backend directory with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Deployment

The frontend can be deployed on Vercel, Netlify, or any static site hosting service.
The backend can be deployed on platforms like Heroku, Railway, or Render.

## Project Structure

- `/src` - Frontend React application
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/assets` - Images and static files
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions
- `/backend` - Express server
  - `/controllers` - Request handlers
  - `/models` - Database schemas
  - `/routes` - API endpoints
  - `/config` - Server configuration

## Contact

Aayush Singh Rajput - [GitHub](https://github.com/AayushSinghRajput)
