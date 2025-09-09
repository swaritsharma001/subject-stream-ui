import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  School,
  GraduationCap,
  BookOpen,
  FileText,
  Key,
  Settings,
  Users
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  {
    title: 'Schools',
    url: '/admin/schools',
    icon: School,
    description: 'Manage educational institutions'
  },
  {
    title: 'Classes',
    url: '/admin/classes',
    icon: GraduationCap,
    description: 'Manage class levels'
  },
  {
    title: 'Subjects',
    url: '/admin/subjects',
    icon: BookOpen,
    description: 'Manage subject categories'
  },
  {
    title: 'Chapters',
    url: '/admin/chapters',
    icon: FileText,
    description: 'Manage chapter content'
  },
  {
    title: 'Pass Keys',
    url: '/admin/passkeys',
    icon: Key,
    description: 'Manage access keys'
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
    description: 'Site configuration'
  }
];

export const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="w-64" collapsible="icon">
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">Admin Panel</h2>
              <p className="text-xs text-sidebar-foreground/60">Content Management</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`group transition-all duration-200 ${
                      isActive(item.url)
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-sidebar-primary' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <Link to={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs opacity-60">{item.description}</p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};