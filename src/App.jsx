import { useState, useEffect } from 'react';
import HeaderClock from './components/JamCihuy';
import PomodoroTimer from './components/Pomodoro';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import { Plus, Sparkles, Loader2 } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // State untuk Kontrol Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // 1. Fetch Task List dari MongoDB
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Handler Buka Modal
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // 3. Handler Save (Bisa untuk Create baru atau Update existing)
  const handleSaveTask = async (formData) => {
    try {
      if (editingTask) {
        // UPDATE TASK
        const res = await fetch(`${API_URL}/${editingTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      } else {
        // CREATE TASK BARU
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        setTasks([created, ...tasks]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Gagal menyimpan task:', err);
    }
  };

  // 4. Selesaikan Task & Timestamp
  const handleCompleteTask = async (task) => {
    const now = new Date();
    const completedAt = `${now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed', completedAt }),
      });
      const updated = await res.json();
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      if (activeTaskId === task._id) setActiveTaskId(null);
    } catch (err) {
      console.error('Gagal menyelesaikan task:', err);
    }
  };

  // 5. Delete Task
  const handleDeleteTask = async (id) => {
    if (!confirm('Yakin ingin menghapus task ini?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((t) => t._id !== id));
      if (activeTaskId === id) setActiveTaskId(null);
    } catch (err) {
      console.error('Gagal menghapus task:', err);
    }
  };

  const activeTask = tasks.find((t) => t._id === activeTaskId);
  const filteredTasks = tasks.filter((t) =>
    activeTab === 'completed' ? t.status === 'completed' : true
  );

  return (
    <div className="min-h-screen bg-vintage-cream p-4 sm:p-8 text-vintage-dark">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-vintage-light/40 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-vintage-dark text-vintage-cream rounded-xl shadow-sm">
                <Sparkles className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-vintage-dark">Time to Lock In</h1>
            </div>
            <p className="text-xs sm:text-sm text-vintage-brown font-medium mt-1">
               Task & Pomodoro Tracker
            </p>
          </div>
          <HeaderClock />
        </header>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sisi Kiri: Pomodoro Timer */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-lg font-bold font-heading">Pomodoro Focus</h2>
            <PomodoroTimer
              activeTask={activeTask}
              onSessionComplete={() => alert('Sesi Pomodoro selesai!')}
            />
          </div>

          {/* Sisi Kanan: Task Tracker */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              {/* Filter Tabs */}
              <div className="flex bg-white/70 p-1 rounded-xl border border-vintage-light/40 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'all' ? 'bg-vintage-dark text-white' : 'text-vintage-dark/70'
                  }`}
                >
                  Semua Task ({tasks.length})
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'completed' ? 'bg-vintage-dark text-white' : 'text-vintage-dark/70'
                  }`}
                >
                  Riwayat Selesai
                </button>
              </div>

              {/* Tombol Buat Task Baru */}
              <button
                onClick={handleOpenCreateModal}
                className="flex items-center gap-1.5 px-4 py-2 bg-vintage-dark text-vintage-cream rounded-xl text-xs font-heading font-semibold hover:bg-vintage-dark/90 shadow-sm transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" /> Task Baru
              </button>
            </div>

            {/* List Tasks */}
            {loading ? (
              <div className="flex items-center justify-center py-12 text-vintage-dark/60 gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Memuat data...
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-vintage-light/40 rounded-2xl">
                <p className="text-sm text-vintage-dark/60 font-medium">Belum ada task di kategori ini.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    isActive={task._id === activeTaskId}
                    onStart={(t) => setActiveTaskId(t._id)}
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                    onEdit={handleOpenEditModal}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Dialog Form Tambah / Edit Task */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        initialData={editingTask}
      />
    </div>
  );
}