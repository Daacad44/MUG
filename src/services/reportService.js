import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const reportService = {
  getReports: async () => {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase.from('reports').select('*').order('created_at', { ascending: false });
    if (error) return [];
    return data;
  },

  exportCSV: (data, filename) => {
    if (!data?.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },

  exportPNG: (mapContainer) => {
    if (!mapContainer) return;
    alert('Use your browser screenshot tool (Win+Shift+S) to capture the map view.');
  },

  uploadReport: async (title, file) => {
    if (!isSupabaseConfigured) return { id: 'local', title, file_url: URL.createObjectURL(file) };
    const path = `reports/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from('reports').upload(path, file);
    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage.from('reports').getPublicUrl(path);
    const { data, error } = await supabase.from('reports').insert({ title, file_url: urlData.publicUrl }).select().single();
    if (error) throw error;
    return data;
  },
};
