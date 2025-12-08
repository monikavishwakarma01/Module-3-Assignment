import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Clock, LogOut, Shield } from "lucide-react";
import routes from "../../routes";

const Header = () => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const navigation = routes.filter((route) => route.visible !== false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                AI Time Tracker
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="hidden md:flex items-center gap-2">
                  {navigation.map((item) => (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={location.pathname === item.path ? "default" : "ghost"}
                        size="sm"
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  {profile?.role === 'admin' && (
                    <Link to="/admin">
                      <Button
                        variant={location.pathname === '/admin' ? "default" : "ghost"}
                        size="sm"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {profile?.username || 'User'}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
