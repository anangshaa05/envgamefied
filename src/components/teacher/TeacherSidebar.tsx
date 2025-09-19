import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { BookOpen, MessageSquare, Award, User } from 'lucide-react';

const menuItems = [
  { title: 'Classes', url: '/teacher-dashboard', icon: BookOpen, exact: true },
  { title: 'Announcements', url: '/teacher-dashboard/announcements', icon: MessageSquare },
  { title: 'Student Assessment', url: '/teacher-dashboard/assessment', icon: Award },
  { title: 'Profile', url: '/teacher-dashboard/profile', icon: User },
];

export function TeacherSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar className={state === 'collapsed' ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Teacher Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.exact}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== 'collapsed' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}