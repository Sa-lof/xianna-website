import supabase from '../../supabaseClient';

interface Prenda {
  id: number;
  nombre: string;
  link: string;
  id_outfit: number;
}

export const updatePrendas = async (prendas: Prenda[]): Promise<void> => {
  try {
    for (const prenda of prendas) {
      const { id, nombre, link } = prenda;
      const { error } = await supabase
        .from('prendas')
        .update({ nombre, link })
        .eq('id', id);

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error updating prendas:', error);
  }
};
