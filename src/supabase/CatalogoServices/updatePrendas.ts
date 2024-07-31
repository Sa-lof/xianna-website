import supabase from '../../supabaseClient';

interface Prenda {
  id: number;
  nombre: string;
  link: string;
  id_outfit: number;
  imagen?: string;
}

export const updatePrendas = async (prendas: Prenda[]): Promise<void> => {
  try {
    for (const prenda of prendas) {
      const { id, nombre, link } = prenda;
      const { error } = await supabase
        .from('prendas')
        .update({ nombre, link }) // Asegúrate de actualizar la imagen también
        .eq('id', id);

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error updating prendas:', error);
  }
};
