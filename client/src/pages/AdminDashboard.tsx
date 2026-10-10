import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Users, Activity, Settings, UserPlus, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import HeaderUserMenu from '../components/HeaderUserMenu';

export default function AdminDashboard() {
  const location = useLocation();

  const navItems = [
    { name: 'System Analytics', path: '/admin', icon: Activity },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3 text-white">
          <div className="bg-red-500 p-2 rounded-lg">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white">EduMind Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-slate-800 text-white font-medium' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-slate-800">Admin Control Panel</h1>
          <HeaderUserMenu fallbackRole="admin" badgeColor="bg-red-100 text-red-700" />
        </header>
        <main className="p-8">
          <Routes>
            <Route path="/" element={<SystemAnalyticsView />} />
            <Route path="/users" element={<UserManagementView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function SystemAnalyticsView() {
  const activeUsersData = [
    { name: 'Mon', users: 1200 },
    { name: 'Tue', users: 1900 },
    { name: 'Wed', users: 1500 },
    { name: 'Thu', users: 2200 },
    { name: 'Fri', users: 2800 },
    { name: 'Sat', users: 3400 },
    { name: 'Sun', users: 3100 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-800">Platform Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Students', value: '12,450', change: '+12%' },
          { label: 'Tests Attempted (Today)', value: '3,842', change: '+5%' },
          { label: 'Active Teachers', value: '450', change: '+2%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="flex items-baseline space-x-4 mt-2">
              <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 text-slate-700">Active Users (7 Days)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeUsersData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="users" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function UserManagementView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm transition-colors">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-600">User</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Role</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Joined</th>
              <th className="p-4 text-sm font-semibold text-slate-600 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { name: 'John Doe', email: 'john@student.com', role: 'Student', status: 'Active' },
              { name: 'Jane Smith', email: 'jane@teacher.com', role: 'Teacher', status: 'Active' },
              { name: 'System Admin', email: 'admin@edumind.com', role: 'Admin', status: 'Active' },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-slate-800">{user.name}</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    user.role === 'Admin' ? 'bg-red-50 text-red-600' :
                    user.role === 'Teacher' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <span className="flex items-center text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-600">Oct 08, 2026</td>
                <td className="p-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <MoreVertical className="w-5 h-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
