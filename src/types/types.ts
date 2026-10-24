export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  username: string | null;
  role: UserRole;
  created_at: string;
}

export type ActivityCategory = 'Work' | 'Study' | 'Sleep' | 'Entertainment' | 'Exercise';

export interface Activity {
  id: string;
  user_id: string;
  date: string;
  title: string;
  category: ActivityCategory;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface ActivityInput {
  title: string;
  category: ActivityCategory;
  duration: number;
}

export interface DayStats {
  totalMinutes: number;
  totalActivities: number;
  categoryBreakdown: Record<ActivityCategory, number>;
}
