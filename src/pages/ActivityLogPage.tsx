import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { activityApi } from '@/db/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar, Clock, Edit2, Trash2, BarChart3, Plus } from 'lucide-react';
import type { Activity, ActivityCategory, ActivityInput } from '@/types/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const CATEGORIES: ActivityCategory[] = ['Work', 'Study', 'Sleep', 'Entertainment', 'Exercise'];

const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  Work: 'bg-blue-100 text-blue-700 border-blue-200',
  Study: 'bg-green-100 text-green-700 border-green-200',
  Sleep: 'bg-purple-100 text-purple-700 border-purple-200',
  Entertainment: 'bg-pink-100 text-pink-700 border-pink-200',
  Exercise: 'bg-orange-100 text-orange-700 border-orange-200',
};

export default function ActivityLogPage() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ActivityCategory>('Work');
  const [duration, setDuration] = useState('');
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadActivities();
    }
  }, [selectedDate, user]);

  const loadActivities = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await activityApi.getActivitiesByDate(user.id, selectedDate);
      setActivities(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load activities',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
  const remainingMinutes = 1440 - totalMinutes;
  const canAnalyze = totalMinutes > 0 && totalMinutes <= 1440;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an activity title',
        variant: 'destructive',
      });
      return;
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid duration',
        variant: 'destructive',
      });
      return;
    }

    if (!editingActivity && totalMinutes + durationNum > 1440) {
      toast({
        title: 'Error',
        description: `Cannot add activity. Only ${remainingMinutes} minutes remaining for this day.`,
        variant: 'destructive',
      });
      return;
    }

    if (editingActivity) {
      const otherActivitiesTotal = activities
        .filter(a => a.id !== editingActivity.id)
        .reduce((sum, a) => sum + a.duration, 0);
      
      if (otherActivitiesTotal + durationNum > 1440) {
        toast({
          title: 'Error',
          description: `Cannot update activity. Total would exceed 1440 minutes.`,
          variant: 'destructive',
        });
        return;
      }
    }

    setLoading(true);
    try {
      if (editingActivity) {
        await activityApi.updateActivity(editingActivity.id, {
          title,
          category,
          duration: durationNum,
        });
        toast({
          title: 'Success',
          description: 'Activity updated successfully',
        });
      } else {
        await activityApi.createActivity(user!.id, selectedDate, {
          title,
          category,
          duration: durationNum,
        });
        toast({
          title: 'Success',
          description: 'Activity added successfully',
        });
      }
      
      setTitle('');
      setCategory('Work');
      setDuration('');
      setEditingActivity(null);
      setIsDialogOpen(false);
      await loadActivities();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save activity',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setTitle(activity.title);
    setCategory(activity.category);
    setDuration(activity.duration.toString());
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;

    setLoading(true);
    try {
      await activityApi.deleteActivity(id);
      toast({
        title: 'Success',
        description: 'Activity deleted successfully',
      });
      await loadActivities();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete activity',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = () => {
    navigate(`/dashboard?date=${selectedDate}`);
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Work');
    setDuration('');
    setEditingActivity(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Activity Log</h1>
        <p className="text-muted-foreground">Track your daily activities and manage your time</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="max-w-xs"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activities for {format(new Date(selectedDate), 'MMMM d, yyyy')}</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</DialogTitle>
                      <DialogDescription>
                        {editingActivity ? 'Update the activity details below' : 'Enter the details for your new activity'}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Activity Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Morning workout"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={(value) => setCategory(value as ActivityCategory)}>
                          <SelectTrigger id="category">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          placeholder="e.g., 60"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" disabled={loading} className="flex-1">
                          {loading ? 'Saving...' : editingActivity ? 'Update' : 'Add Activity'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {loading && activities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">Loading activities...</div>
              ) : activities.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No activities logged for this day</p>
                  <p className="text-sm text-muted-foreground">Click "Add Activity" to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <Card key={activity.id} className="border-l-4" style={{ borderLeftColor: `hsl(var(--chart-${CATEGORIES.indexOf(activity.category) + 1}))` }}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">{activity.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full border ${CATEGORY_COLORS[activity.category]}`}>
                                {activity.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{activity.duration} minutes</span>
                              <span className="mx-2">•</span>
                              <span>{(activity.duration / 60).toFixed(1)} hours</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(activity)}
                              disabled={loading}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(activity.id)}
                              disabled={loading}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Summary</CardTitle>
              <CardDescription>Time logged for {format(new Date(selectedDate), 'MMM d')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Total Time</span>
                  <span className="font-semibold text-foreground">
                    {(totalMinutes / 60).toFixed(1)} hrs
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${Math.min((totalMinutes / 1440) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    {totalMinutes} / 1440 minutes
                  </span>
                  <span className={`text-xs font-medium ${remainingMinutes < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {remainingMinutes >= 0 ? `${remainingMinutes} min left` : `${Math.abs(remainingMinutes)} min over`}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Activities</span>
                  <span className="font-semibold text-foreground">{activities.length}</span>
                </div>
              </div>

              {totalMinutes > 1440 && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">
                    ⚠️ Total exceeds 24 hours
                  </p>
                  <p className="text-xs text-destructive/80 mt-1">
                    Please adjust your activities
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button
                className="w-full"
                size="lg"
                onClick={handleAnalyze}
                disabled={!canAnalyze}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Analyze Day
              </Button>
              {!canAnalyze && totalMinutes === 0 && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Add activities to enable analysis
                </p>
              )}
              {!canAnalyze && totalMinutes > 1440 && (
                <p className="text-xs text-destructive text-center mt-2">
                  Total time must not exceed 24 hours
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
