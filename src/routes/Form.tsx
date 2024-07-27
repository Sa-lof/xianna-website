import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question/Question";
import LargeButton from "../components/LargeButton/LargeButton";
import UserDataForm from "../components/UserDataForm/UserDataForm";
import getQuestionsWithAnswers from "../supabase/CuestionarioServices/getQuestionsWithAnswers";
import getStyles from "../supabase/CuestionarioServices/getStyles"; // Ajusta la ruta según sea necesario
import supabase from "../supabaseClient";

const pink = "#E61F93";

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

interface Estilo {
  id: number;
  tipo: string;
  descripcion: string;
}

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [styles, setStyles] = useState<Estilo[]>([]);

  const questionsPerPage = 3;
  const questionColors = ["#FFC0CB", "#FFD700", "#ADD8E6"];

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestionsWithAnswers();
      setQuestions(fetchedQuestions);
    };
    const fetchStyles = async () => {
      const fetchedStyles = await getStyles();
      setStyles(fetchedStyles);
    };
    fetchQuestions();
    fetchStyles();
  }, []);

  const totalSteps = Math.ceil(questions.length / questionsPerPage) + 1;

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await updateUserDetails();
      navigate("/some-link"); // Reemplaza con el enlace real
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUserDataSubmit = (data: any) => {
    setUserData(data);
    setCurrentStep(1); // Mover al primer conjunto de preguntas
    console.log(data); // Verificar los datos capturados
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const getQuestionsForCurrentStep = () => {
    const startIndex = (currentStep - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return questions.slice(startIndex, endIndex);
  };

  const getRandomStyleId = (): number => {
    if (styles.length === 0) return 1; // Default value if styles are not loaded
    const randomIndex = Math.floor(Math.random() * styles.length);
    return styles[randomIndex].id;
  };

  const updateUserDetails = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const user = session.user;

      // Mapea las respuestas seleccionadas a los campos de user_details
      const updatedDetails = {
        tipo_estilo: getRandomStyleId(), // Asigna un estilo aleatorio
        sexo: userData.sex,
        edad: userData.age,
        profesion: userData.profession,
        talla: userData.size,
        tipo_cuerpo: userData.bodyType,
        nombre: userData.name,
        ciudad: userData.country,
      };

      const { error } = await supabase
        .from('user_details')
        .update(updatedDetails)
        .eq('correo', user.email);

      if (error) {
        console.error('Error updating user details:', error);
      } else {
        console.log('User details updated successfully');
      }
    }
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Full viewport height
          paddingBottom: 10, // Responsive padding
          paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
          paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
          paddingTop: 5,
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            marginBottom: 7,
            display: "flex",
          }}
        >
          <IconButton
            sx={{
              backgroundColor: pink,
              width: 100,
              height: 100,
              "&:hover": {
                backgroundColor: pink,
                transform: "scale(1.1)",
                transition: "transform 0.3s ease-in-out",
                boxShadow: "none",
              },
            }}
            onClick={() => navigate("/")}
          >
            <CloseIcon sx={{ fontSize: 40, color: "white" }} />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7} lg={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", fontSize: "64px" }}
            >
              Descubre tu verdadero estilo
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4, fontSize: "40px" }}>
              Responde el cuestionario y descubre tu estilo prevalecedor
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={6}>
            {currentStep === 0 ? (
              <UserDataForm onSubmit={handleUserDataSubmit} />
            ) : (
              <>
                {getQuestionsForCurrentStep().map((q, index) => (
                  <Question
                    key={q.id}
                    color={questionColors[index % questionColors.length]}
                    question={q.pregunta}
                    questionNumber={(currentStep - 1) * questionsPerPage + index + 1}
                    responses={q.answers.map((answer: Answer) => answer.respuesta)}
                    selectedResponse={selectedAnswers[q.id] || ""}
                    onResponseChange={(answer) => handleAnswerChange(q.id, answer)}
                  />
                ))}
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 4,
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  {currentStep > 1 && (
                    <LargeButton
                      text="Atrás"
                      link="#"
                      textColor="white"
                      arrowColor="white"
                      backgroundColor={pink}
                      onClick={handleBack}
                      sx={{ mt: 4 }} // Additional styles if needed
                    />
                  )}
                  <LargeButton
                    text={currentStep < totalSteps - 1 ? "Siguiente" : "Enviar"}
                    link="#"
                    textColor="white"
                    arrowColor="white"
                    backgroundColor={pink}
                    onClick={handleNext}
                    sx={{ mt: 4 }} // Additional styles if needed
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Slide>
  );
};

export default Form;
