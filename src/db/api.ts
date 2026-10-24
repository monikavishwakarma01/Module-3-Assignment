import { supabase } from './supabase';
import type { Activity, ActivityInput, Profile } from '@/types/types';

export const activityApi = {
  async getActivitiesByDate(userId: string, date: string): Promise<Activity[]> {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createActivity(userId: string, date: string, input: ActivityInput): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .insert({
        user_id: userId,
        date,
        title: input.title,
        category: input.category,
        duration: input.duration,
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create activity');
    return data;
  },

  async updateActivity(id: string, input: Partial<ActivityInput>): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update activity');
    return data;
  },

  async deleteActivity(id: string): Promise<void> {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getActivitiesInRange(userId: string, startDate: string, endDate: string): Promise<Activity[]> {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },
};

export const profileApi = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId);

    if (error) throw error;
  },
};
