
  ##video link of project overview: https://drive.google.com/file/d/1Un-VSj6srmK0bfmDNKTKpYY8SeG47tab/view?usp=drivesdk

# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-83asnx1da03l

# AI Time Tracker

A full-featured React web application for tracking daily activities and analyzing time usage patterns. Users can log activities across different categories, visualize their time distribution, and gain insights into how they spend their day.

## 🌟 Features

### User Authentication
- Email and password registration and login
- Google SSO integration
- Secure user session management
- Role-based access control (User/Admin)

### Activity Logging
- Date picker to select target day for logging activities
- Activity entry form with:
  - Title: text input for activity name
  - Category: dropdown selection (Work, Study, Sleep, Entertainment, Exercise)
  - Duration: numeric input in minutes
- Real-time validation: total minutes logged per day cannot exceed 1440 minutes (24 hours)
- Display remaining available minutes for the selected date
- Edit and delete functionality for existing activities
- Card-based layout for each activity entry

### Dashboard & Analytics
- Date picker for navigating between different days
- Summary statistics section displaying:
  - Total hours logged for the selected day
  - Time breakdown by category
  - Total number of activities
  - Day coverage percentage
- Pie chart visualizing category distribution
- Bar chart displaying individual activity durations
- Empty state with friendly prompts when no activities exist

### Admin Panel
- User management interface
- Role assignment (User/Admin)
- View all registered users
- First registered user automatically becomes admin

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Routing**: React Router v6

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Header.tsx          # Navigation header
│   │   └── ui/                     # shadcn/ui components
│   ├── contexts/
│   │   └── AuthContext.tsx         # Authentication context
│   ├── db/
│   │   ├── supabase.ts            # Supabase client
│   │   └── api.ts                 # Database API functions
│   ├── pages/
│   │   ├── LoginPage.tsx          # Login page
│   │   ├── SignupPage.tsx         # Signup page
│   │   ├── ActivityLogPage.tsx    # Activity logging page
│   │   ├── DashboardPage.tsx      # Analytics dashboard
│   │   └── AdminPage.tsx          # Admin panel
│   ├── types/
│   │   └── types.ts               # TypeScript type definitions
│   ├── App.tsx                    # Main app component
│   ├── routes.tsx                 # Route configuration
│   └── index.css                  # Global styles
├── supabase/
│   └── migrations/                # Database migrations
└── index.html                     # Entry HTML file
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
The `.env` file should already contain your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev -- --host 127.0.0.1
```

## 📊 Database Schema

### Tables

#### profiles
- `id` (uuid, primary key) - References auth.users
- `username` (text, unique) - User's username
- `role` (user_role enum) - User role (user/admin)
- `created_at` (timestamptz) - Account creation timestamp

#### activities
- `id` (uuid, primary key) - Activity ID
- `user_id` (uuid) - References profiles(id)
- `date` (date) - Activity date
- `title` (text) - Activity name
- `category` (text) - Activity category
- `duration` (integer) - Duration in minutes
- `created_at` (timestamptz) - Creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

## 🎨 Design System

- **Primary Color**: Blue (#3B82F6 / hsl(217, 91%, 60%))
- **Background**: Light gray tones for clean appearance
- **Category Colors**:
  - Work: Blue
  - Study: Green
  - Sleep: Purple
  - Entertainment: Pink
  - Exercise: Orange
- **Typography**: Sans-serif with clear hierarchy
- **Layout**: Card-based with rounded corners and subtle shadows
- **Responsive**: Mobile-first design adapting to all screen sizes

## 🔐 Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Admins have full access to all data
- Secure authentication with Supabase Auth
- Protected routes requiring authentication

## 📝 Usage

1. **Sign Up**: Create a new account with username and password, or use Google SSO
2. **Log Activities**: Select a date and add activities with title, category, and duration
3. **Track Time**: Monitor your daily time usage with the summary panel
4. **Analyze**: Click "Analyze Day" to view detailed charts and statistics
5. **Manage**: Admins can access the Admin panel to manage user roles

## 🎯 Key Features Explained

### 1440 Minutes Validation
The application enforces a strict 24-hour (1440 minutes) limit per day:
- Real-time calculation of remaining minutes
- Visual feedback when approaching or exceeding the limit
- "Analyze Day" button disabled when limit is exceeded
- Clear error messages for validation failures

### Category-Based Tracking
Five predefined categories help organize activities:
- **Work**: Professional tasks and meetings
- **Study**: Learning and educational activities
- **Sleep**: Rest and sleep time
- **Entertainment**: Leisure and recreation
- **Exercise**: Physical activities and workouts

### Visual Analytics
Comprehensive data visualization:
- **Pie Chart**: Shows percentage distribution across categories
- **Bar Chart**: Compares individual activity durations
- **Progress Bars**: Display time breakdown by category
- **Statistics Cards**: Quick overview of key metrics

## 🤝 Contributing

This is a production-ready application. For modifications:
1. Follow the existing code structure
2. Maintain TypeScript type safety
3. Use shadcn/ui components for consistency
4. Test all changes thoroughly

## 📄 License

2025 AI Time Tracker

## 🆘 Support

For issues or questions, please refer to the Supabase documentation or React documentation.
