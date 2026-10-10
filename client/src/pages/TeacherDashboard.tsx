import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Database, Plus, Search, Edit2, Trash2, BrainCircuit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import HeaderUserMenu from '../components/HeaderUserMenu';

export default function TeacherDashboard() {
  const location = useLocation();

  const navItems = [
    { name: 'Student Monitoring', path: '/teacher', icon: Users },
    { name: 'Question Bank', path: '/teacher/questions', icon: Database },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3 text-white">
          <div className="bg-primary p-2 rounded-lg">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-white">EduMind Teacher</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/teacher' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-slate-800 text-white font-medium' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-slate-800">Teacher Portal</h1>
          <HeaderUserMenu fallbackRole="teacher" badgeColor="bg-emerald-100 text-emerald-700" />
        </header>
        <main className="p-8">
          <Routes>
            <Route path="/" element={<MonitoringView />} />
            <Route path="/questions" element={<QuestionBankView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function MonitoringView() {
  const classData = [
    { name: 'Algebra', avgScore: 82 },
    { name: 'Geometry', avgScore: 65 },
    { name: 'Trigonometry', avgScore: 78 },
    { name: 'Calculus', avgScore: 55 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-800">Class Performance Overview</h2>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 text-slate-700">Average Scores by Subject</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="avgScore" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Struggling Students (Action Required)</h3>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-sm font-semibold text-slate-600">Student Name</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Weak Topic</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Predicted Score</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-medium text-slate-800">Alice Smith</td>
                <td className="p-4 text-sm text-red-500 font-medium bg-red-50 rounded inline-block mt-2 ml-4 px-2 py-1">Calculus</td>
                <td className="p-4 text-sm text-slate-600">52%</td>
                <td className="p-4 text-sm">
                  <button className="text-primary hover:underline font-medium">Assign Remedial Test</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-medium text-slate-800">Bob Johnson</td>
                <td className="p-4 text-sm text-amber-500 font-medium bg-amber-50 rounded inline-block mt-2 ml-4 px-2 py-1">Geometry</td>
                <td className="p-4 text-sm text-slate-600">60%</td>
                <td className="p-4 text-sm">
                  <button className="text-primary hover:underline font-medium">Review Analytics</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QuestionBankView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Question Bank Management</h2>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center space-x-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search questions by text or topic..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
        </div>
        <select className="border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-white">
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Physics</option>
        </select>
        <select className="border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-white">
          <option>All Difficulties</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((q) => (
            <div key={q} className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-start group">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-600 rounded">Math</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">Integration</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-rose-50 text-rose-600 rounded">Hard</span>
                </div>
                <p className="font-medium text-slate-800">What is the integral of x*e^x dx?</p>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-primary bg-white border border-slate-200 rounded-lg shadow-sm">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
