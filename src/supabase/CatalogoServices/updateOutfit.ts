import supabase from '../../supabaseClient';

interface UpdateOutfitData {
  id: number;
  nombre?: string;
  descripcion?: string;
  id_estilo?: number;
  ocasiones?: number[];
  imagen?: string; // Agregamos la propiedad imagen
}

const updateOutfit = async (outfitData: UpdateOutfitData): Promise<void> => {
  const { id, nombre, descripcion, id_estilo, ocasiones, imagen } = outfitData;

  try {
    // Actualizar los campos básicos del outfit
    const { error: outfitError } = await supabase
      .from('outfits')
      .update({ nombre, descripcion, id_estilo, imagen }) // Incluimos imagen en la actualización
      .eq('id', id);

    if (outfitError) {
      throw outfitError;
    }

    // Actualizar las ocasiones
    if (ocasiones) {
      // Primero, eliminamos todas las ocasiones actuales para este outfit
      const { error: deleteError } = await supabase
        .from('outfit_ocasion')
        .delete()
        .eq('id_outfit', id);

      if (deleteError) {
        throw deleteError;
      }

      // Luego, insertamos las nuevas ocasiones
      const { error: insertError } = await supabase
        .from('outfit_ocasion')
        .insert(ocasiones.map((id_ocasion) => ({ id_outfit: id, id_ocasion })));

      if (insertError) {
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error updating outfit:', error);
  }
};

export default updateOutfit;
