import supabase from '../../supabaseClient';

export const checkSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Error fetching session");
  }

  return data.session;
};
