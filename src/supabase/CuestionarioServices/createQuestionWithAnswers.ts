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

interface QuestionData {
  id: number;
  pregunta: string;
}

const createQuestionWithAnswers = async (question: Question): Promise<void> => {
  try {
    // Insert the new question
    const { data: questionData, error: questionError } = await supabase
      .from('preguntas')
      .insert({ pregunta: question.pregunta })
      .select()
      .single();

    if (questionError) {
      throw questionError;
    }

    if (!questionData) {
      throw new Error('Question data is null');
    }

    const questionId = (questionData as QuestionData).id;

    // Insert each answer
    for (const answer of question.answers) {
      const { error: answerError } = await supabase
        .from('respuestas')
        .insert({
          respuesta: answer.respuesta,
          identificador: answer.identificador,
          id_estilo: answer.id_estilo,
          id_pregunta: questionId,
        });

      if (answerError) {
        throw answerError;
      }
    }

    console.log('Question and answers created successfully');
  } catch (error) {
    console.error('Error creating question and answers:', error);
  }
};

export default createQuestionWithAnswers;
