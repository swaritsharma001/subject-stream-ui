import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Users, BookOpen, Key, TrendingUp, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Schools', value: '12', icon: School, change: '+2' },
    { title: 'Active Students', value: '1,234', icon: Users, change: '+123' },
    { title: 'Total Chapters', value: '456', icon: BookOpen, change: '+23' },
    { title: 'Pass Keys Generated', value: '789', icon: Key, change: '+45' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm">New chapter uploaded for Mathematics</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-secondary" />
                <span className="text-sm">25 new student registrations</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <School className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Add School</div>
              </button>
              <button className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-secondary" />
                <div className="text-sm font-medium">Upload Chapter</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;