import { Play, Check, Trash2, Edit3, CalendarCheck } from 'lucide-react';

export default function TaskCard({ task, isActive, onStart, onComplete, onDelete, onEdit }) {
  return (
    <div
      className={`bg-white/80 rounded-2xl p-5 border transition-all duration-200 shadow-sm ${
        isActive
          ? 'border-vintage-dark ring-2 ring-vintage-dark/20 shadow-md bg-vintage-cream/30'
          : 'border-vintage-light/40 hover:border-vintage-light'
      }`}
    >
      <div className="flex gap-4">
        {task.imageUrl && (
          <img
            src={task.imageUrl}
            alt={task.title}
            className="w-20 h-20 rounded-xl object-cover border border-vintage-light/40 flex-shrink:0;"
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`font-heading font-bold text-base text-vintage-dark ${
                task.status === 'completed' ? 'line-through text-vintage-dark/50' : ''
              }`}
            >
              {task.title}
            </h4>
            
            <div className="flex items-center gap-1.5">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  task.priority === 'High'
                    ? 'bg-red-100 text-red-700'
                    : task.priority === 'Medium'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {task.priority}
              </span>
              
              {/* Tombol Delete */}
              <button
                onClick={() => onDelete(task._id)}
                className="p-1 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                title="Hapus Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs text-vintage-dark/70 mt-1 line-clamp-2">{task.description}</p>

          {/* History info jika selesai */}
          {task.status === 'completed' && task.completedAt && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200">
              <CalendarCheck className="w-4 h-4 flex-shrink:0;" />
              <span>Selesai pada: <strong>{task.completedAt}</strong></span>
            </div>
          )}

          {/* Action buttons jika belum selesai */}
          {task.status !== 'completed' && (
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => onStart(task)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-vintage-brown text-white'
                    : 'bg-vintage-cream text-vintage-dark border border-vintage-light/60 hover:bg-vintage-light/20'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isActive ? 'Tracking...' : 'Start'}
              </button>

              <button
                onClick={() => onComplete(task)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1.5 transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                Mark Done
              </button>

              <button
                onClick={() => onEdit(task)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-vintage-dark/70 hover:text-vintage-dark bg-vintage-cream border border-vintage-light/40 flex items-center gap-1 transition-all"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}