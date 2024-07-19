import supabase from '../../supabaseClient';

const deletePrenda = async (prendaId: number, outfitId: number): Promise<void> => {
  try {
    // Eliminar archivos y carpetas de la prenda
    const { data: files, error: listFilesError } = await supabase
      .storage
      .from('Outfits')
      .list(`uploads/${outfitId}/prenda_${prendaId}`);

    if (listFilesError) {
      throw listFilesError;
    }

    if (files && files.length > 0) {
      const deleteFilesPromises = files.map(file => {
        const filePath = `uploads/${outfitId}/prenda_${prendaId}/${file.name}`;
        return supabase.storage.from('Outfits').remove([filePath]);
      });
      await Promise.all(deleteFilesPromises);
    }

    // Eliminar la carpeta de la prenda
    await supabase.storage.from('Outfits').remove([`uploads/${outfitId}/prenda_${prendaId}`]);

    // Eliminar la prenda de la base de datos
    const { error } = await supabase
      .from('prendas')
      .delete()
      .eq('id', prendaId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting prenda:', error);
    throw error;
  }
};

export default deletePrenda;