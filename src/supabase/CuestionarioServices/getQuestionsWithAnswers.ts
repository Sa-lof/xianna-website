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

const getQuestionsWithAnswers = async (): Promise<Question[]> => {
  try {
    const { data: questionsData, error: questionsError } = await supabase
      .from('preguntas')
      .select('id, pregunta');

    if (questionsError) {
      throw questionsError;
    }

    const { data: answersData, error: answersError } = await supabase
      .from('respuestas')
      .select('id, respuesta, identificador, id_estilo, id_pregunta');

    if (answersError) {
      throw answersError;
    }

    const questions: Question[] = questionsData.map((question: any) => ({
      ...question,
      answers: answersData.filter((answer: any) => answer.id_pregunta === question.id),
    }));

    return questions;
  } catch (error) {
    console.error('Error fetching questions and answers:', error);
    return [];
  }
};

export default getQuestionsWithAnswers;
