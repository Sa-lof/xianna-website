import supabase from '../../supabaseClient';

export const getUserDetails = async (email: any) => {
  const { data: userDetails, error } = await supabase
    .from('user_details')
    .select('tipo_estilo')
    .eq('correo', email)
    .single();

  if (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details');
  }

  return userDetails;
};
