import supabase from '../../supabaseClient';

interface Answer {
  id: number;
  respuesta: string;
  identificador: string;
  id_estilo: number;
  id_pregunta: number;
}

interface Question {
  id: number;
  pregunta: string;
  answers: Answer[];
}

const deleteQuestionWithAnswers = async (questionId: number): Promise<void> => {
  try {
    // Delete answers associated with the question
    const { error: answersError } = await supabase
      .from('respuestas')
      .delete()
      .eq('id_pregunta', questionId);

    if (answersError) {
      throw answersError;
    }

    // Delete the question
    const { error: questionError } = await supabase
      .from('preguntas')
      .delete()
      .eq('id', questionId);

    if (questionError) {
      throw questionError;
    }

    console.log('Question and answers deleted successfully');
  } catch (error) {
    console.error('Error deleting question and answers:', error);
  }
};

export default deleteQuestionWithAnswers;
