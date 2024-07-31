import supabase from "../../supabaseClient";
interface Outfit {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    favorite: boolean;
  }

  export const getFavorites = async (email: string) => {
    const { data: favoritos, error } = await supabase
      .from("favoritos")
      .select("outfit")
      .eq("usuario", email);
  
    if (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  
    return favoritos.map((fav) => fav.outfit);
  };
  
  export const getOutfitsByIds = async (ids: number[]) => {
    const { data: outfits, error } = await supabase
      .from("outfits")
      .select(`
        id,
        nombre,
        descripcion,
        id_estilo,
        estilos ( tipo ),
        outfit_ocasion ( ocasion ( ocasion ) ),
        favoritos: favoritos ( id )
      `)
      .in("id", ids);
  
    if (error) {
      console.error("Error fetching outfits:", error);
      return [];
    }
  
    const detailedOutfits = await Promise.all(
      outfits.map(async (outfit: any) => {
        const { data: files, error: fileError } = await supabase
          .storage
          .from("Outfits")
          .list(`uploads/${outfit.id}/imagen_principal`, { limit: 1 });
  
        if (fileError) {
          console.error("Error fetching outfit images:", fileError);
          return null;
        }
  
        const imageUrl = files.length > 0
          ? supabase.storage.from("Outfits").getPublicUrl(`uploads/${outfit.id}/imagen_principal/${files[0].name}`).data.publicUrl
          : "https://via.placeholder.com/150";
  
        const ocasiones = outfit.outfit_ocasion.map((o: any) => o.ocasion.ocasion);
  
        return {
          id: outfit.id,
          nombre: outfit.nombre,
          descripcion: outfit.descripcion,
          id_estilo: outfit.id_estilo,
          estilo: outfit.estilos.tipo,
          imagen: imageUrl,
          ocasiones,
          favoritos: outfit.favoritos.length,
          favorite: true,
        };
      })
    );
  
    return detailedOutfits.filter((outfit) => outfit !== null) as Outfit[];
  };
  
  export const removeFavorite = async (email: string, outfitId: number) => {
    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("usuario", email)
      .eq("outfit", outfitId);
  
    if (error) {
      console.error("Error removing favorite:", error);
      return false;
    }
  
    return true;
  };
  