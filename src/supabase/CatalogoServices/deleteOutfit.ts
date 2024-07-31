import supabase from '../../supabaseClient';

const deleteOutfit = async (outfitId: number): Promise<void> => {
  try {
    // Function to delete files and folders recursively
    const deleteFolderRecursive = async (path: string) => {
      console.log(`Deleting folder contents: ${path}`);
      const { data: files, error: listFilesError } = await supabase
        .storage
        .from('Outfits')
        .list(path, { limit: 100 });

      if (listFilesError) {
        console.error('Error listing files:', listFilesError);
        throw listFilesError;
      }

      if (files && files.length > 0) {
        const deleteFilesPromises = files.map(file => {
          const filePath = `${path}/${file.name}`;
          if (file.metadata) {
            console.log(`Entering folder: ${filePath}`);
            return deleteFolderRecursive(filePath);
          } else {
            console.log(`Deleting file: ${filePath}`);
            return supabase.storage.from('Outfits').remove([filePath]);
          }
        });
        await Promise.all(deleteFilesPromises);
      }

      // Attempt to delete the folder if it is empty
      const { error: removeFolderError } = await supabase
        .storage
        .from('Outfits')
        .remove([path]);

      if (removeFolderError) {
        console.error('Error deleting folder:', removeFolderError);
      } else {
        console.log(`Folder deleted: ${path}`);
      }
    };

    // Delete the outfit from favoritos first
    const { error: deleteFavoritosError } = await supabase
      .from('favoritos')
      .delete()
      .eq('outfit', outfitId);

    if (deleteFavoritosError) {
      console.error('Error deleting favoritos:', deleteFavoritosError);
      throw deleteFavoritosError;
    }

    // Delete files and folders from the main outfit folder
    await deleteFolderRecursive(`uploads/${outfitId}/imagen_principal`);
    const { data: prendas, error: listPrendasError } = await supabase
      .from('prendas')
      .select('id')
      .eq('id_outfit', outfitId);

    if (listPrendasError) {
      console.error('Error listing prendas:', listPrendasError);
      throw listPrendasError;
    }

    if (prendas && prendas.length > 0) {
      for (const prenda of prendas) {
        await deleteFolderRecursive(`uploads/${outfitId}/prenda_${prenda.id}`);
      }
    }
    await deleteFolderRecursive(`uploads/${outfitId}`);

    // Delete prenda records from the database
    const { error: deletePrendasError } = await supabase
      .from('prendas')
      .delete()
      .eq('id_outfit', outfitId);

    if (deletePrendasError) {
      console.error('Error deleting prendas:', deletePrendasError);
      throw deletePrendasError;
    }

    // Delete associated occasions
    const { error: deleteOcasionesError } = await supabase
      .from('outfit_ocasion')
      .delete()
      .eq('id_outfit', outfitId);

    if (deleteOcasionesError) {
      console.error('Error deleting occasions:', deleteOcasionesError);
      throw deleteOcasionesError;
    }

    const { error: deleteOutfitError } = await supabase
      .from('outfits')
      .delete()
      .eq('id', outfitId);

    if (deleteOutfitError) {
      console.error('Error deleting outfit:', deleteOutfitError);
      throw deleteOutfitError;
    }

  } catch (error) {
    console.error('Error deleting outfit:', error);
    throw error;
  }
};

export default deleteOutfit;
