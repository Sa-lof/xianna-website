// getStylesAndOccasions.ts
import supabase from '../../supabaseClient';

interface Style {
  id: number;
  tipo: string;
  descripcion: string;
}

interface Occasion {
  id: number;
  ocasion: string;
}

const getStyles = async (): Promise<Style[]> => {
  try {
    const { data, error } = await supabase.from('estilos').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching styles:', error);
    return [];
  }
};

const getOccasions = async (): Promise<Occasion[]> => {
  try {
    const { data, error } = await supabase.from('ocasion').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching occasions:', error);
    return [];
  }
};

export { getStyles, getOccasions };
