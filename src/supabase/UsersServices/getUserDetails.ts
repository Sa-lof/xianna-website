import supabase from '../../supabaseClient';

export const getUserDetails = async (userEmail: string) => {
  const { data: userDetails, error } = await supabase
    .from('user_details')
    .select('*')
    .eq('correo', userEmail)
    .single();

  if (error) {
    console.error('Error fetching user details:', error);
    return null;
  }

  return userDetails;
};

export const updateUserDetails = async (updatedUser: any) => {
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

  if (error) {
    console.error('Error updating user details:', error);
    return null;
  }

  return data;
};
