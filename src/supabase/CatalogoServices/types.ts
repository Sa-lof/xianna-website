export interface Outfit {
    id: number;
    nombre: string;
    descripcion: string;
    estilo: string;
    id_estilo: number;
    imagen: string;
    ocasiones: string[];
    favoritos: number; 
}

export interface Prenda {
    id: number;
    nombre: string;
    link: string;
    id_outfit: number;
    imagen?: string;
}

export interface Style {
    id: number;
    tipo: string;
    descripcion: string;
}

export interface Occasion {
    id: number;
    ocasion: string;
  }