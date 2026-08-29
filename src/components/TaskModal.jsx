import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Flame, Check } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, initialData = null }) {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    pomodoroTarget: 2,
    imageUrl: '',
  });

  // Sinkronisasi data saat modal dibuka untuk Edit atau Create
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'Medium',
        pomodoroTarget: initialData.pomodoroTarget || 2,
        imageUrl: initialData.imageUrl || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        pomodoroTarget: 2,
        imageUrl: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Handle upload file lokal (convert ke Base64 preview)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vintage-dark/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-vintage-light/50 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-vintage-light/30 flex items-center justify-between bg-vintage-cream/40">
          <div>
            <h3 className="font-heading font-bold text-xl text-vintage-dark">
              {isEditMode ? 'Edit Rincian Task' : 'Tambah Task Baru'}
            </h3>
            <p className="text-xs text-vintage-brown font-medium mt-0.5">
              {isEditMode ? 'Perbarui informasi dan target fokus' : 'Rencanakan tugas dan alokasi waktu Pomodoro'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-vintage-dark/50 hover:text-vintage-dark hover:bg-vintage-light/20 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Judul Task */}
          <div>
            <label className="block text-xs font-bold font-heading text-vintage-dark uppercase tracking-wider mb-1.5">
              Judul Task <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Misal: Review Dokumentasi Modul 3"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-vintage-light/60 bg-vintage-cream/20 text-vintage-dark placeholder:text-vintage-dark/40 text-sm focus:outline-none focus:ring-2 focus:ring-vintage-dark/30 focus:border-vintage-dark transition-all"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold font-heading text-vintage-dark uppercase tracking-wider mb-1.5">
              Deskripsi Detail
            </label>
            <textarea
              rows="3"
              placeholder="Catatan tambahan, checklist, atau tautan referensi..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-vintage-light/60 bg-vintage-cream/20 text-vintage-dark placeholder:text-vintage-dark/40 text-sm focus:outline-none focus:ring-2 focus:ring-vintage-dark/30 focus:border-vintage-dark transition-all resize-none"
            />
          </div>

          {/* Prioritas & Target Pomodoro (2 Kolom) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prioritas */}
            <div>
              <label className="block text-xs font-bold font-heading text-vintage-dark uppercase tracking-wider mb-1.5">
                Tingkat Prioritas
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-vintage-light/60 bg-vintage-cream/20 text-vintage-dark text-sm focus:outline-none focus:ring-2 focus:ring-vintage-dark/30 focus:border-vintage-dark font-medium"
              >
                <option value="Low">🌱 Low (Santai)</option>
                <option value="Medium">🌿 Medium (Standar)</option>
                <option value="High">🔥 High (Prioritas)</option>
              </select>
            </div>

            {/* Target Pomodoro */}
            <div>
              <label className="block text-xs font-bold font-heading text-vintage-dark uppercase tracking-wider mb-1.5 flex; items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-vintage-brown" /> Target Pomodoro
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.pomodoroTarget}
                onChange={(e) => setFormData({ ...formData, pomodoroTarget: parseInt(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-vintage-light/60 bg-vintage-cream/20 text-vintage-dark text-sm focus:outline-none focus:ring-2 focus:ring-vintage-dark/30 focus:border-vintage-dark font-medium"
              />
            </div>
          </div>

          {/* Lampiran Foto Task */}
          <div>
            <label className="block text-xs font-bold font-heading text-vintage-dark uppercase tracking-wider mb-1.5 flex; items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" /> Foto / Referensi Task
            </label>

            <div className="space-y-3">
              {/* Input URL Gambar */}
              <input
                type="url"
                placeholder="Tempel URL gambar (https://...)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-vintage-light/60 bg-vintage-cream/20 text-vintage-dark placeholder:text-vintage-dark/40 text-xs focus:outline-none focus:ring-2 focus:ring-vintage-dark/30"
              />

              {/* Upload File Alternatif */}
              <div className="flex items-center gap-3">
                <label className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-vintage-cream rounded-xl border border-vintage-light/60 text-xs font-medium text-vintage-dark hover:bg-vintage-light/30 transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih dari Perangkat</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {formData.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Hapus foto
                  </button>
                )}
              </div>

              {/* Preview Gambar */}
              {formData.imageUrl && (
                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-vintage-light/50 bg-vintage-cream/50 mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-vintage-light/30 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-vintage-light/60 text-xs font-semibold text-vintage-dark/80 hover:bg-vintage-cream transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-vintage-dark text-vintage-cream text-xs font-heading font-semibold hover:bg-vintage-dark/90 shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              {isEditMode ? 'Simpan Perubahan' : 'Buat Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}