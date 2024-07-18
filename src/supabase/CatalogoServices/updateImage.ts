import supabase from '../../supabaseClient';

export const uploadImage = async (file: File, type: 'outfit' | 'prenda', id_outfit: number, id_prenda?: number): Promise<string | null> => {
  try {
    let path = '';

    if (type === 'outfit') {
      path = `uploads/${id_outfit}/imagen_principal/${file.name}`;
    } else if (type === 'prenda' && id_prenda !== undefined) {
      path = `uploads/${id_outfit}/prenda_${id_prenda}/${file.name}`;
    }

    // Elimina archivos existentes en el directorio
    const dirPath = path.split('/').slice(0, -1).join('/');
    const { data: files, error: listError } = await supabase.storage.from('Outfits').list(dirPath);

    if (listError) {
      throw listError;
    }

    if (files && files.length > 0) {
      const deletePromises = files.map(file => supabase.storage.from('Outfits').remove([`${dirPath}/${file.name}`]));
      await Promise.all(deletePromises);
    }

    // Sube el nuevo archivo
    const { data, error } = await supabase.storage.from('Outfits').upload(path, file);

    if (error) {
      throw error;
    }

    // Obtiene la URL pública del archivo subido
    const publicUrl = supabase.storage.from('Outfits').getPublicUrl(path).data.publicUrl;
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
