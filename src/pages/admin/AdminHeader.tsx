import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  ArrowLeft, 
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

export const AdminHeader = () => {
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">
              Admin Dashboard
            </h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Administrator
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
          </Button>

          {/* Quick Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* Back to Site */}
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Site
            </Link>
          </Button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Administrator</p>
              <p className="text-xs text-muted-foreground">admin@eduportal.com</p>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};