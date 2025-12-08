import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { activityApi } from '@/db/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, TrendingUp } from 'lucide-react';
import type { Activity, ActivityCategory } from '@/types/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Input } from '@/components/ui/input';

const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  Work: 'hsl(217, 91%, 60%)',
  Study: 'hsl(142, 76%, 36%)',
  Sleep: 'hsl(262, 83%, 58%)',
  Entertainment: 'hsl(340, 82%, 52%)',
  Exercise: 'hsl(45, 93%, 47%)',
};

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const initialDate = searchParams.get('date') || format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
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
  const totalHours = (totalMinutes / 60).toFixed(1);

  const categoryBreakdown = activities.reduce((acc, activity) => {
    acc[activity.category] = (acc[activity.category] || 0) + activity.duration;
    return acc;
  }, {} as Record<ActivityCategory, number>);

  const pieData = Object.entries(categoryBreakdown).map(([category, minutes]) => ({
    name: category,
    value: minutes,
    percentage: ((minutes / totalMinutes) * 100).toFixed(1),
  }));

  const barData = activities.map((activity) => ({
    name: activity.title.length > 20 ? activity.title.substring(0, 20) + '...' : activity.title,
    duration: activity.duration,
    hours: (activity.duration / 60).toFixed(1),
    category: activity.category,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-semibold text-foreground">{payload[0].payload.name}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value} minutes ({payload[0].payload.hours || payload[0].payload.percentage} {payload[0].payload.hours ? 'hours' : '%'})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Activity Log
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard & Analytics</h1>
        <p className="text-muted-foreground">Visualize your time usage patterns</p>
      </div>

      <Card className="mb-6">
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

      {loading ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">Loading analytics...</div>
        </div>
      ) : activities.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No data available</h2>
              <p className="text-muted-foreground mb-6">
                No activities logged for {format(new Date(selectedDate), 'MMMM d, yyyy')}
              </p>
              <Button onClick={() => navigate('/')}>
                Go to Activity Log
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hours Logged</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalHours} hrs</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalMinutes} minutes total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{activities.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {Object.keys(categoryBreakdown).length} categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Day Coverage</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {((totalMinutes / 1440) * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  of 24 hours tracked
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Time breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as ActivityCategory]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Breakdown</CardTitle>
                <CardDescription>Minutes per category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(categoryBreakdown)
                    .sort(([, a], [, b]) => b - a)
                    .map(([category, minutes]) => {
                      const percentage = (minutes / totalMinutes) * 100;
                      return (
                        <div key={category}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">{category}</span>
                            <span className="text-sm text-muted-foreground">
                              {minutes} min ({(minutes / 60).toFixed(1)} hrs)
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="rounded-full h-2 transition-all"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: CATEGORY_COLORS[category as ActivityCategory],
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activity Durations</CardTitle>
              <CardDescription>Individual activity time comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    label={{ value: 'Minutes', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="duration" radius={[8, 8, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category as ActivityCategory]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
