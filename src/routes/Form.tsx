import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, IconButton, Slide, Dialog, DialogContent, Snackbar, Alert} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import QuestionComponent from "../components/Question/Question";
import LargeButton from "../components/LargeButton/LargeButton";
import UserDataForm from "../components/UserDataForm/UserDataForm";
import getQuestionsWithAnswers from "../supabase/CuestionarioServices/getQuestionsWithAnswers";
import getStyles from "../supabase/CuestionarioServices/getStyles";
import Loader from "../components/Loader/Loader";
import { checkSession} from '../supabase/ProfileServices/checkSession';
import { getUserDetails } from '../supabase/ProfileServices/getUserDetails2';
import { updateUserDetails } from '../supabase/ProfileServices/updateUserDetails2';

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

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userStyle, setUserStyle] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // Estado para manejar el loader

  // Estados para manejar el Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const questionsPerPage = 3;
  const questionColors = ["#FFC0CB", "#FFD700", "#ADD8E6"];

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestionsWithAnswers();
      setQuestions(fetchedQuestions);
    };

    const fetchStyles = async () => {
      const fetchedStyles = await getStyles();
      await checkSubmission(fetchedStyles); // Pasar los estilos obtenidos a checkSubmission
    };

    const checkSubmission = async (styles: any[]) => {
      try {
        const session = await checkSession();
        if (session) {
          setIsAuthenticated(true);
          const userDetails = await getUserDetails(session.user.email);
          if (userDetails && userDetails.tipo_estilo) {
            setHasSubmitted(true);
            const userStyle = styles.find(style => style.id === userDetails.tipo_estilo);
            setUserStyle(userStyle ? userStyle.tipo : "Desconocido");
          }
        }
      } catch (error) {
        console.error('Error checking submission', error);
      }
    };    

    const initialize = async () => {
      await fetchQuestions();
      await fetchStyles();
      setLoading(false); // Una vez que los datos se hayan cargado, se oculta el loader
    };

    initialize();
  }, []);

  const totalSteps = Math.ceil(questions.length / questionsPerPage) + 1;

  const handleNext = async () => {
    const currentQuestions = getQuestionsForCurrentStep();
    
    // Verificar que todas las preguntas actuales tengan una respuesta seleccionada
    const allAnswered = currentQuestions.every(
      (q) => selectedAnswers[q.id] && selectedAnswers[q.id] !== ""
    );
  
    if (!allAnswered) {
      setSnackbarMessage("Por favor, responde todas las preguntas antes de continuar.");
      setOpenSnackbar(true); // Mostrar la alerta
      return;
    }
  
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (!isAuthenticated) {
        setOpenDialog(true);
      } else {
        await updateUserData();
        navigate("/perfil"); // Reemplaza con el enlace real
      }
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const updateUserData = async () => {
    try {
      const session = await checkSession();
      if (session) {
        const user = session.user;
  
        if (!user.email) {
          console.error('User email is undefined');
          return;
        }
  
        // Verificar si userData tiene todos los campos necesarios
        if (!userData || !userData.sex || !userData.age || !userData.profession || !userData.size || !userData.bodyType || !userData.name || !userData.country) {
          console.error('User data is incomplete');
          return;
        }
  
        // Calcular la opción más seleccionada
        const styleCount: Record<number, number> = {};
  
        Object.values(selectedAnswers).forEach((answer) => {
          const answerObj = questions.flatMap(q => q.answers).find(a => a.respuesta === answer);
          if (answerObj) {
            const styleId = answerObj.id_estilo;
            styleCount[styleId] = (styleCount[styleId] || 0) + 1;
          }
        });
  
        const mostSelectedStyleId = parseInt(Object.entries(styleCount).reduce(
          (acc, [styleId, count]) => count > acc.count ? { styleId: Number(styleId), count } : acc,
          { styleId: 0, count: 0 }
        ).styleId.toString(), 10);
  
        const updatedDetails = {
          tipo_estilo: mostSelectedStyleId,
          sexo: userData.sex,
          edad: userData.age,
          profesion: userData.profession,
          talla: userData.size,
          tipo_cuerpo: userData.bodyType,
          nombre: userData.name,
          ciudad: userData.country,
        };
  
        const success = await updateUserDetails(user.email, updatedDetails);
        if (success) {
          console.log('User details updated successfully');
        }
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };    

  const handleRetakeForm = () => {
    setHasSubmitted(false);
    setCurrentStep(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return <Loader />;
  }

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
        {hasSubmitted ? (
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Typography variant="h1" sx={{ mb: 2, fontSize: {
                  xs: '18px', 
                  sm: '20px',
                  md: '22px',
                  lg: '24px',
                }, }}>
              Tu tipo de estilo es:
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: {
                  xs: '24px', 
                  sm: '28px',
                  md: '32px',
                  lg: '40px',
                }, }}>
              {userStyle}
            </Typography>
            <Grid container>
  <Grid item xs={12} sm={12} md={6} lg={6}>
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", md: "flex-end" }, // centrado en pantallas pequeñas, alineado a la derecha en grandes
        mt: 4,
        mb: 4,
      }}
    >
      <LargeButton
        text="Volver a hacer el test"
        link="#"
        textColor="white"
        arrowColor="white"
        backgroundColor={pink}
        onClick={handleRetakeForm}
      />
    </Box>
  </Grid>
  <Grid item xs={12} sm={12} md={6} lg={6}>
    <Box
      sx={{
        display: "flex",
        pl:"2%",
        justifyContent: { xs: "center", md: "flex-start"}, // centrado en pantallas pequeñas, alineado a la izquierda en grandes
        mt: 4,
        mb: 4,
      }}
    >
      <LargeButton
        text="Conocer más sobre mi estilo"
        link="/perfil"
        textColor="black"
        arrowColor="black"
        backgroundColor="white"
        sx={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // sombra al botón
        }}
      />
    </Box>
  </Grid>
</Grid>
            
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7} lg={6}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", fontSize: {
                  xs: '48px', 
                  sm: '52px',
                  md: '56px',
                  lg: '64px',
                }, }}
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
                    <QuestionComponent
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
        )}
        <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  PaperProps={{
    style: {
      backgroundColor: pink,
      borderRadius: "20px",
      padding: "20px", // Add padding to the dialog content
      display: "flex", // Ensure dialog content is centered
      alignItems: "center",
      justifyContent: "center",
    },
  }}
>
  <DialogContent sx={{ textAlign: "center" }}>
    <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
      ¡Conóce tus resultados!
    </Typography>
    <Typography variant="body1" sx={{ color: "white", mb: 3 }}>
      Crea tu cuenta para poder descubrir tu estilo y recibir consejos para mejorarlo.
    </Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <LargeButton
        text="Registrarse"
        link="/registro"
        textColor="black"
        arrowColor="black"
        backgroundColor="white"
      />
    </Box>
  </DialogContent>
</Dialog>
<Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

      </Box>
    </Slide>
  );
};

export default Form;
