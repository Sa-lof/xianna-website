import supabase from '../../supabaseClient';

interface Prenda {
  nombre: string;
  link: string;
  id_outfit: number;
}

const createPrenda = async (prendaData: Prenda): Promise<number | null> => {
  const { nombre, link, id_outfit } = prendaData;

  try {
    const { data, error: prendaError } = await supabase
      .from('prendas')
      .insert({ nombre, link, id_outfit })
      .select('id')
      .single();

    if (prendaError) {
      throw prendaError;
    }

    return data.id;
  } catch (error) {
    console.error('Error creating prenda:', error);
    return null;
  }
};

export default createPrenda;
