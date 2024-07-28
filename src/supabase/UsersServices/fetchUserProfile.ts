import supabase from "../../supabaseClient";
import getOutfits from "../../supabase/UsersServices/getOutfits";
import { getPrendasByOutfitId } from "../../supabase/UsersServices/getPrendasByOutfitId";
import { Prenda, Outfit, User } from "../UsersServices/types"

export const fetchUserProfile = async (setUser: React.Dispatch<React.SetStateAction<User>>) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const userEmail: string = session.user.email || "";
    const { data: userDetails, error } = await supabase
      .from('user_details')
      .select('*')
      .eq('correo', userEmail)
      .single();

    if (userDetails) {
      const { data: styleData, error: styleError } = await supabase
        .from('estilos')
        .select('tipo, descripcion')
        .eq('id', userDetails.tipo_estilo)
        .single();

      if (styleError) {
        console.error('Error fetching style description:', styleError);
      } else if (styleData) {
        const outfits: Outfit[] = await getOutfits(userDetails.tipo_estilo);
        const allPrendas: Prenda[][] = await Promise.all(outfits.map((outfit) => getPrendasByOutfitId(outfit.id)));
        const mergedPrendas: Prenda[] = allPrendas.flat();

        setUser({
          name: userDetails.nombre,
          email: userEmail,
          city: userDetails.ciudad,
          sex: userDetails.sexo,
          age: userDetails.edad,
          profession: userDetails.profesion,
          bodyType: userDetails.tipo_cuerpo,
          size: userDetails.talla,
          country: userDetails.country,
          styleType: styleData.tipo,
          styleDescription: styleData.descripcion,
          colors: userDetails.colors || [],
          outfits: outfits,
          basicItems: mergedPrendas,
          tips: userDetails.tips || [],
        });
      }
    } else {
      console.error('Error fetching user details:', error);
    }
  }
};
