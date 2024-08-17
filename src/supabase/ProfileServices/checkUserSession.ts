import supabase from '../../supabaseClient';
import { fetchUserProfile } from "../UsersServices/fetchUserProfile";
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

export const checkUserSession = async (navigate: any, setUser: React.Dispatch<React.SetStateAction<User>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    navigate("/"); // Redirigir a la página de inicio de sesión si no hay sesión
    return;
  }
  await fetchUserProfile(setUser);
  setIsLoading(false);
};
