import supabase from '../../supabaseClient';

const deleteOutfit = async (outfitId: number): Promise<void> => {
  try {
    // Función para eliminar archivos y carpetas de forma recursiva
    const deleteFolderRecursive = async (path: string) => {
      console.log(`Eliminando contenido de la carpeta: ${path}`);
      const { data: files, error: listFilesError } = await supabase
        .storage
        .from('Outfits')
        .list(path, { limit: 100 });

      if (listFilesError) {
        console.error('Error al listar archivos:', listFilesError);
        throw listFilesError;
      }

      if (files && files.length > 0) {
        const deleteFilesPromises = files.map(file => {
          const filePath = `${path}/${file.name}`;
          if (file.metadata) {
            console.log(`Entrando a la carpeta: ${filePath}`);
            return deleteFolderRecursive(filePath);
          } else {
            console.log(`Eliminando archivo: ${filePath}`);
            return supabase.storage.from('Outfits').remove([filePath]);
          }
        });
        await Promise.all(deleteFilesPromises);
      }

      // Intentar eliminar la carpeta si está vacía
      const { error: removeFolderError } = await supabase
        .storage
        .from('Outfits')
        .remove([path]);

      if (removeFolderError) {
        console.error('Error al eliminar la carpeta:', removeFolderError);
      } else {
        console.log(`Carpeta eliminada: ${path}`);
      }
    };

    // Eliminar archivos y carpetas de la carpeta principal del outfit
    await deleteFolderRecursive(`uploads/${outfitId}/imagen_principal`);
    const { data: prendas, error: listPrendasError } = await supabase
      .from('prendas')
      .select('id')
      .eq('id_outfit', outfitId);

    if (listPrendasError) {
      console.error('Error al listar prendas:', listPrendasError);
      throw listPrendasError;
    }

    if (prendas && prendas.length > 0) {
      for (const prenda of prendas) {
        await deleteFolderRecursive(`uploads/${outfitId}/prenda_${prenda.id}`);
      }
    }
    await deleteFolderRecursive(`uploads/${outfitId}`);

    // Eliminar registros de prendas de la base de datos
    const { error: deletePrendasError } = await supabase
      .from('prendas')
      .delete()
      .eq('id_outfit', outfitId);

    if (deletePrendasError) {
      console.error('Error al eliminar prendas:', deletePrendasError);
      throw deletePrendasError;
    }

    // Eliminar registros de ocasiones asociadas
    const { error: deleteOcasionesError } = await supabase
      .from('outfit_ocasion')
      .delete()
      .eq('id_outfit', outfitId);

    if (deleteOcasionesError) {
      console.error('Error al eliminar ocasiones:', deleteOcasionesError);
      throw deleteOcasionesError;
    }

    // Eliminar el outfit de la base de datos
    const { error: deleteOutfitError } = await supabase
      .from('outfits')
      .delete()
      .eq('id', outfitId);

    if (deleteOutfitError) {
      console.error('Error al eliminar el outfit:', deleteOutfitError);
      throw deleteOutfitError;
    }

  } catch (error) {
    console.error('Error deleting outfit:', error);
    throw error;
  }
};

export default deleteOutfit;
