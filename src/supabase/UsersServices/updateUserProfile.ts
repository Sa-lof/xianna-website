import supabase from '../../supabaseClient';
import { User } from "../UsersServices/types";

export const updateUserProfile = async (updatedUser: User) => {
  const { data, error } = await supabase
    .from('user_details')
    .update({
      nombre: updatedUser.name,
      ciudad: updatedUser.city,
      sexo: updatedUser.sex,
      edad: updatedUser.age,
      profesion: updatedUser.profession,
      tipo_cuerpo: updatedUser.bodyType,
      talla: updatedUser.size,
      country: updatedUser.country,
    })
    .eq('correo', updatedUser.email);

  return { data, error };
};
