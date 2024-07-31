import supabase from '../../supabaseClient';

interface Prenda {
  id: number;
  nombre: string;
  link: string;
  imagen: string;
  id_outfit: number;
}

export const getPrendasByOutfitId = async (id_outfit: number): Promise<Prenda[]> => {
  try {
    const { data, error } = await supabase
      .from('prendas')
      .select('id, nombre, link, id_outfit')
      .eq('id_outfit', id_outfit);

    if (error) {
      throw error;
    }

    const prendas: Prenda[] = await Promise.all(
      data.map(async (prenda: any) => {
        const { data: files, error: fileError } = await supabase
          .storage
          .from('Outfits')
          .list(`uploads/${prenda.id_outfit}/prenda_${prenda.id}`, { limit: 1 });

        if (fileError) {
          console.error('Error listing files:', fileError);
          throw fileError;
        }

        const imageUrl = files.length > 0
          ? supabase.storage.from('Outfits').getPublicUrl(`uploads/${prenda.id_outfit}/prenda_${prenda.id}/${files[0].name}`).data.publicUrl
          : 'https://via.placeholder.com/150';

        console.log(`Prenda ID: ${prenda.id}, File Name: ${files[0]?.name}, Image URL: ${imageUrl}`);

        return {
          id: prenda.id,
          nombre: prenda.nombre,
          link: prenda.link,
          id_outfit: prenda.id_outfit,
          imagen: imageUrl,
        };
      })
    );

    return prendas;
  } catch (error) {
    console.error('Error fetching prendas:', error);
    return [];
  }
};
