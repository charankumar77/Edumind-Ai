import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface HeaderUserMenuProps {
  fallbackRole?: string;
  badgeColor?: string;
}

export default function HeaderUserMenu({ fallbackRole = 'student', badgeColor = 'bg-indigo-100 text-indigo-700' }: HeaderUserMenuProps) {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const storedUserRaw = localStorage.getItem('user');
  let user: { name?: string; email?: string; role?: string; picture?: string } | null = null;
  try {
    user = storedUserRaw ? JSON.parse(storedUserRaw) : null;
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return name.slice(0, 2).toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return fallbackRole.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3">
      {/* User Info & Avatar */}
      <div className="flex items-center space-x-2.5">
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.name || 'Profile'}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
          />
        ) : (
          <div className={`w-8 h-8 ${badgeColor} rounded-full flex items-center justify-center font-bold text-xs shadow-sm`}>
            {getInitials(user?.name, user?.email)}
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-slate-800 leading-tight">
            {user?.name || user?.email?.split('@')[0] || 'User'}
          </p>
          <p className="text-[10px] text-slate-500 capitalize leading-tight">
            {user?.role || fallbackRole}
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-all shadow-sm cursor-pointer ml-2"
        title="Sign Out"
      >
        <LogOut className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-500" />
        <span className="hidden md:inline">Logout</span>
      </button>
    </div>
  );
}
