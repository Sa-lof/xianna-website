import supabase from '../../supabaseClient';

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Error logging out: ${error.message}`);
  }

  return { success: true };
};
