import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpenCheck, BrainCircuit, PlayCircle, FileText, Target } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import HeaderUserMenu from '../components/HeaderUserMenu';

export default function StudentDashboard() {
  const location = useLocation();

  const navItems = [
    { name: 'Analytics', path: '/student', icon: LayoutDashboard },
    { name: 'Mock Tests', path: '/student/tests', icon: BookOpenCheck },
    { name: 'Learning Path', path: '/student/learning', icon: BrainCircuit },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="bg-primary text-white p-2 rounded-lg">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-slate-900">EduMind</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/student' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 hover:bg-slate-100'
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
          <h1 className="text-xl font-semibold text-slate-800">Student Portal</h1>
          <HeaderUserMenu fallbackRole="student" badgeColor="bg-indigo-100 text-indigo-700" />
        </header>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<AnalyticsView />} />
            <Route path="/tests" element={<MockTestView />} />
            <Route path="/learning" element={<LearningPathView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Sub-components
function AnalyticsView() {
  const radarData = [
    { subject: 'Algebra', A: 90, fullMark: 100 },
    { subject: 'Geometry', A: 60, fullMark: 100 },
    { subject: 'Trigonometry', A: 85, fullMark: 100 },
    { subject: 'Calculus', A: 45, fullMark: 100 },
    { subject: 'Statistics', A: 70, fullMark: 100 },
  ];

  const lineData = [
    { name: 'Test 1', accuracy: 55, time: 45 },
    { name: 'Test 2', accuracy: 62, time: 42 },
    { name: 'Test 3', accuracy: 58, time: 40 },
    { name: 'Test 4', accuracy: 75, time: 35 },
    { name: 'Test 5', accuracy: 82, time: 30 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-800">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Topic Proficiency</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Student" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Accuracy over Time</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockTestView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Available Mock Tests</h2>
          <p className="text-slate-500 mt-1">Take tests to update your AI learning profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow group">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Mathematics - Unit {i}</h3>
            <p className="text-sm text-slate-500 mt-2 mb-4">20 Questions • 30 Minutes • Medium</p>
            <button className="w-full py-2 bg-slate-50 hover:bg-primary hover:text-white text-primary font-medium rounded-lg transition-colors border border-primary/20 hover:border-primary">
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LearningPathView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Your Personalized Learning Path</h2>
        <p className="text-slate-500 mt-1">AI-curated resources based on your recent "Calculus" test performance.</p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-orange-800">Focus Area: Integration by Parts</h3>
            <p className="text-orange-700 mt-1">You missed 70% of questions related to this topic in your last test.</p>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-lg text-slate-800 mb-4">Recommended for you</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Video Card */}
        <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
          <div className="w-1/3 bg-slate-100 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
            <PlayCircle className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors z-10" />
          </div>
          <div className="p-4 w-2/3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Video Tutorial</span>
            <h4 className="font-bold text-slate-800 mt-1">Mastering Integration by Parts</h4>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">A step-by-step visual guide to understanding the formula and applying it to complex problems.</p>
          </div>
        </div>

        {/* Notes Card */}
        <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
          <div className="w-1/3 bg-slate-100 flex items-center justify-center">
             <FileText className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div className="p-4 w-2/3">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">Study Notes</span>
            <h4 className="font-bold text-slate-800 mt-1">Calculus Cheat Sheet: Integration</h4>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">Quick reference formulas and example solutions for your weak areas.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
