import supabase from '../../supabaseClient';

interface Estilo {
  id: number;
  tipo: string;
  descripcion: string;
}

const getStyles = async (): Promise<Estilo[]> => {
  try {
    const { data, error } = await supabase
      .from('estilos')
      .select('id, tipo, descripcion');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching styles:', error);
    return [];
  }
};

export default getStyles;
