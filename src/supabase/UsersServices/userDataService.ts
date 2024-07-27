// supabase/services/userDataService.ts
import supabase from '../../supabaseClient';

export const saveUserData = async (email: string, data: any) => {
  const { error } = await supabase
    .from('user_details')
    .upsert({ correo: email, ...data }, { onConflict: 'correo' });

  if (error) {
    console.error('Error saving user data:', error);
    return false;
  }
  return true;
};

