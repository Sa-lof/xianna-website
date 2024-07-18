import supabase from '../../supabaseClient';

interface Outfit {
  id: number;
  nombre: string;
  descripcion: string;
  id_estilo: number;
  estilo: string;
  imagen: string;
  ocasiones: string[];
}

const getOutfits = async (): Promise<Outfit[]> => {
  try {
    const { data, error } = await supabase
      .from('outfits')
      .select(`
        id,
        nombre,
        descripcion,
        id_estilo,
        estilos ( tipo ),
        outfit_ocasion ( ocasion ( ocasion ) )
      `);

    if (error) {
      throw error;
    }

    const outfits: Outfit[] = await Promise.all(
      data.map(async (outfit: any) => {
        const { data: files, error: fileError } = await supabase
          .storage
          .from('Outfits')
          .list(`uploads/${outfit.id}/imagen_principal`, { limit: 1 });

        if (fileError) {
          throw fileError;
        }

        const imageUrl = files.length > 0
          ? supabase.storage.from('Outfits').getPublicUrl(`uploads/${outfit.id}/imagen_principal/${files[0].name}`).data.publicUrl
          : 'https://via.placeholder.com/150'; // Default image if none found

        const ocasiones = outfit.outfit_ocasion.map((o: any) => o.ocasion.ocasion);

        return {
          id: outfit.id,
          nombre: outfit.nombre,
          descripcion: outfit.descripcion,
          id_estilo: outfit.id_estilo,
          estilo: outfit.estilos.tipo,
          imagen: imageUrl,
          ocasiones,
        };
      })
    );

    return outfits;
  } catch (error) {
    console.error('Error fetching outfits:', error);
    return [];
  }
};

export default getOutfits;
