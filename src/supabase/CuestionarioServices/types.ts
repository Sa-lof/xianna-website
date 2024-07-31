export interface Answer {
    id: number;
    respuesta: string;
    identificador: string;
    id_estilo: number;
    id_pregunta: number;
}

export interface Question {
    id: number;
    pregunta: string;
    answers: Answer[];
}

export interface Estilo {
    id: number;
    tipo: string;
    descripcion: string;
}