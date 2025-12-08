/*
# Create profiles and activities tables for AI Time Tracker

## 1. New Tables

### profiles
- `id` (uuid, primary key, references auth.users)
- `username` (text, unique)
- `created_at` (timestamptz, default: now())

### activities
- `id` (uuid, primary key, default: gen_random_uuid())
- `user_id` (uuid, references profiles(id), not null)
- `date` (date, not null) - The date this activity belongs to
- `title` (text, not null) - Activity name
- `category` (text, not null) - Category: Work, Study, Sleep, Entertainment, Exercise
- `duration` (integer, not null) - Duration in minutes
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())

## 2. Security

- Enable RLS on both tables
- Create admin helper function to check user role
- Profiles policies:
  - Admins have full access to all profiles
  - Users can view their own profile
  - Users can update their own profile without changing role
- Activities policies:
  - Users can view their own activities
  - Users can insert their own activities
  - Users can update their own activities
  - Users can delete their own activities
  - Admins have full access to all activities

## 3. Triggers

- Auto-sync new users to profiles table when confirmed
- First user becomes admin, subsequent users are regular users
- Update updated_at timestamp on activities table

## 4. Indexes

- Index on activities(user_id, date) for efficient queries
*/

-- Create user role enum
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  duration integer NOT NULL CHECK (duration > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_activities_user_date ON activities(user_id, date);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create admin helper function
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile without changing role" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) 
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Activities policies
CREATE POLICY "Users can view own activities" ON activities
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities" ON activities
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities" ON activities
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own activities" ON activities
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins have full access to activities" ON activities
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Create trigger function to auto-sync users to profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  INSERT INTO profiles (id, username, role)
  VALUES (
    NEW.id,
    SPLIT_PART(NEW.email, '@', 1),
    CASE WHEN user_count = 0 THEN 'admin'::user_role ELSE 'user'::user_role END
  );
  RETURN NEW;
END;
$$;

-- Create trigger to sync users
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Create trigger function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for activities updated_at
CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON activities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create public view for profiles
CREATE OR REPLACE VIEW public_profiles AS
SELECT
  id,
  username,
  created_at
FROM profiles;