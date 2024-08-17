import supabase from '../../supabaseClient';

export const getUserDetailsByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('user_details')
    .select('nombre, tipo_estilo')
    .eq('correo', email)
    .single();

  if (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }

  return data;
};
