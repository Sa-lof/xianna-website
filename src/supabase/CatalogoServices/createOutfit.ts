import supabase from '../../supabaseClient';

interface NewOutfitData {
  nombre: string;
  descripcion: string;
  id_estilo: number;
  ocasiones: number[];
}

interface OutfitInsertResponse {
  id: number;
}

const createOutfit = async (outfitData: NewOutfitData): Promise<number | null> => {
  const { nombre, descripcion, id_estilo, ocasiones } = outfitData;

  try {
    const { data, error: outfitError } = await supabase
      .from('outfits')
      .insert({ nombre, descripcion, id_estilo })
      .select('id')
      .single() as { data: OutfitInsertResponse, error: any };

    if (outfitError) {
      throw outfitError;
    }

    const outfitId = data.id;

    // Insertar las ocasiones para el nuevo outfit
    if (ocasiones.length > 0) {
      const { error: insertError } = await supabase
        .from('outfit_ocasion')
        .insert(ocasiones.map((id_ocasion) => ({ id_outfit: outfitId, id_ocasion })));

      if (insertError) {
        throw insertError;
      }
    }

    return outfitId;
  } catch (error) {
    console.error('Error creating outfit:', error);
    return null;
  }
};

export default createOutfit;
