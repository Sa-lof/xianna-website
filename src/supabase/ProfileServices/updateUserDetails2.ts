import supabase from '../../supabaseClient';

interface UserDetails {
  tipo_estilo?: number;
  genero?: string;
  edad?: number;
  ocupacion?: string;
  talla?: string;
  tipo_cuerpo?: string;
  nombre?: string;
  estado?: string;
}

export const updateUserDetails = async (email: string, details: UserDetails) => {
  const { error } = await supabase
    .from('user_details')
    .update(details)
    .eq('correo', email);

  if (error) {
    console.error('Error updating user details:', error);
    return false;
  } else {
    console.log('User details updated successfully');
    return true;
  }
};
