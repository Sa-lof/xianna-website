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

const updateQuestionWithAnswers = async (question: Question, deletedAnswers: Answer[]): Promise<void> => {
  try {
    // Update the question
    const { error: questionError } = await supabase
      .from('preguntas')
      .update({ pregunta: question.pregunta })
      .eq('id', question.id);

    if (questionError) {
      throw questionError;
    }

    // Delete removed answers
    for (const answer of deletedAnswers) {
      const { error: deleteError } = await supabase
        .from('respuestas')
        .delete()
        .eq('id', answer.id);

      if (deleteError) {
        throw deleteError;
      }
    }

    // Iterate through each answer
    for (const answer of question.answers) {
      if (answer.id !== 0) {
        // If the answer has an id, update it
        const { error: answerError } = await supabase
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
      } else {
        // If the answer does not have an id, insert it as a new answer
        const { error: answerError } = await supabase
          .from('respuestas')
          .insert({
            respuesta: answer.respuesta,
            identificador: answer.identificador,
            id_estilo: answer.id_estilo,
            id_pregunta: question.id,
          });

        if (answerError) {
          throw answerError;
        }
      }
    }

    console.log('Question and answers updated successfully');
  } catch (error) {
    console.error('Error updating question and answers:', error);
  }
};

export default updateQuestionWithAnswers;
