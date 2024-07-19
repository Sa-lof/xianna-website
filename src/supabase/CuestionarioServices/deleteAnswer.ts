import supabase from '../../supabaseClient';

const deleteAnswer = async (answerId: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('respuestas')
      .delete()
      .eq('id', answerId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting answer:', error);
  }
};

export default deleteAnswer;
