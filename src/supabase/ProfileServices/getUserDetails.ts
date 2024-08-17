import supabase from '../../supabaseClient';

export const getUserDetails = async (email: string) => {
  const { data, error } = await supabase
    .from('user_details')
    .select('*')
    .eq('correo', email)
    .single();

  if (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }

  return data;
};
