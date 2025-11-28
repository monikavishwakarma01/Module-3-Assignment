# AI Time Tracker Requirements Document

## 1. Application Overview

### 1.1 Application Name
AI Time Tracker

### 1.2 Application Description
A full-featured React web application for tracking daily activities and analyzing time usage patterns. Users can log activities across different categories, visualize their time distribution, and gain insights into how they spend their day.

### 1.3 Technology Stack
- Frontend: React + Tailwind CSS
- Authentication: Firebase Authentication
- Database: Firebase Firestore
- Charts: Chart.js or Recharts library
- Deployment: GitHub Pages / Vercel / Netlify\n
---

## 2. Core Features

### 2.1 User Authentication
- Email and password registration and login functionality
- Google login integration using OSS Google login method
- User session management powered by Firebase Authentication
- Secure user data isolation\n
### 2.2 Activity Logging
- Date picker to select the target day for logging activities
- Activity entry form with the following fields:
  * Title: text input for activity name
  * Category: dropdown selection (Work, Study, Sleep, Entertainment, Exercise)
  * Duration: numeric input in minutes
- Real-time validation: total minutes logged per day cannot exceed 1440 minutes (24 hours)
- Display remaining available minutes for the selected date
- Edit and delete functionality for existing activities
- List view showing all activities for the selected date
- Card-based layout for each activity entry
\n### 2.3 Dashboard & Analytics
- Date picker for navigating between different days
- Summary statistics section displaying:
  * Total hours logged for the selected day
  * Time breakdown by category
  * Total number of activities
- Pie chart visualizing category distribution
- Bar chart displaying individual activity durations
- Empty state message:'No data available' with friendly prompt when no activities exist for selected date
\n### 2.4 Analyse Button
- Button enabled only when total minutes for the day≤ 1440
- Clicking navigates user to the dashboard view for that specific date
- Button disabled (grayed out) if daily limit is exceeded
- Clear visual feedback for enabled/disabled states

### 2.5 Data Storage
- All data stored in Firebase Firestore
- Data structure: users/{userId}/days/{date}/activities
- Real-time synchronization across multiple devices
- Automatic data persistence and retrieval

---

## 3. Design Style

### 3.1 Color Scheme
- Primary action color: blue (#3B82F6) for buttons and interactive elements
- Background: neutral gray tones for clean, professional appearance
- Category-specific colors for charts to enhance visual distinction
\n### 3.2 Visual Details
- Rounded corners (rounded-lg) for cards and buttons
- Subtle shadows (shadow-md) to create depth and hierarchy
- Smooth transitions on hover and click for all interactive elements
- Sans-serif typography with clear hierarchy: large headings for sections, readable body text for content

### 3.3 Layout & Responsiveness
- Mobile-first responsive design adapting to tablet and desktop screens
- Card-based layout for activity entries providing clear visual separation
- Clean navigation flow: Login → Activity Log → Dashboard
- Friendly empty states with helpful prompts for days without data

---

## 4. Technical Requirements

### 4.1 Architecture
- Clean component-based architecture\n- Separate folders for pages and reusable components
- Modular code structure for maintainability
\n### 4.2 Development Process
- Utilize AI tools (Medo.dev AI) for generating pages, forms, and chart components
- Follow React best practices and hooks patterns
\n### 4.3 Deployment
- Production-ready build configuration
- Deployment to GitHub Pages, Vercel, or Netlify
- Include professional README.md documentation with:\n  * Project description
  * Technology stack overview
  * Live demo link\n  * Screenshots or GIFs demonstrating key features
  * Video walkthrough of the application