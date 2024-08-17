import supabase from '../../supabaseClient';
export interface Prenda {
    id: number;
    nombre: string;
    link: string;
    imagen: string;
    id_outfit: number;
  }
  
export interface Outfit {
    id: number;
    nombre: string;
    descripcion: string;
    id_estilo: number;
    estilo: string;
    imagen: string;
    ocasiones: string[];
    favoritos: number;
  }
  
export interface User {
    name: string;
    email: string;
    city: string;
    sex: string;
    age: number;
    profession: string;
    bodyType: string;
    size: string;
    country: string;
    styleType: string;
    styleDescription: string;
    colors: string[];
    outfits: Outfit[];
    basicItems: Prenda[];
    tips: string[];
  }
export const updateUserProfile = async (updatedUser: User) => {
  const { error } = await supabase
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

  if (error) {
    throw new Error(`Error updating user details: ${error.message}`);
  }

  return { success: true };
};
