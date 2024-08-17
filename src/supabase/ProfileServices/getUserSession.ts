import supabase from '../../supabaseClient';

export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session) {
    throw new Error("Error fetching session or no active session found.");
  }

  return data.session;
};
