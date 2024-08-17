import supabase from '../../supabaseClient';

export const registerUser = async (email: string, password: string, name: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  const { error: insertError } = await supabase
    .from('user_details')
    .insert([{ correo: email, nombre: name }]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  return { success: true };
};

export const loginUser = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
};
