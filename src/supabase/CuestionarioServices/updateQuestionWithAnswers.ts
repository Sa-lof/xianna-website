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

const updateQuestionWithAnswers = async (question: Question): Promise<void> => {
  try {
    // Update the question
    const { data: questionData, error: questionError } = await supabase
      .from('preguntas')
      .update({ pregunta: question.pregunta })
      .eq('id', question.id);

    if (questionError) {
      throw questionError;
    }

    // Update each answer
    for (const answer of question.answers) {
      const { data: answerData, error: answerError } = await supabase
        .from('respuestas')
        .update({
          respuesta: answer.respuesta,
          identificador: answer.identificador,
          id_estilo: answer.id_estilo,
        })
        .eq('id', answer.id);

      if (answerError) {
        throw answerError;
      }
    }

    console.log('Question and answers updated successfully');
  } catch (error) {
    console.error('Error updating question and answers:', error);
  }
};

export default updateQuestionWithAnswers;
