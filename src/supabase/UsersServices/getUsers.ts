import supabase from '../../supabaseClient';

interface User {
  id: number;
  correo: string;
  estado: string;
  nombre: string;
  tipo_estilo: number;
  ocupacion: string;
  edad: number;
  talla: string;
  tipo_cuerpo:string;
  avatar?: string;
}


const getUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('user_details')
      .select('id, correo, estado, nombre, tipo_estilo, ocupacion, edad, talla, tipo_cuerpo');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default getUsers;
