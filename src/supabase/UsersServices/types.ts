export interface Prenda {
    id: number;
    nombre: string;
    link: string;
    imagen: string;
    id_outfit: number;
  }
  
export interface Outfit {
    id: number;
    nombre: string;
    descripcion: string;
    id_estilo: number;
    estilo: string;
    imagen: string;
    ocasiones: string[];
    favoritos: number;
  }
  
export interface User {
    name: string;
    email: string;
    city: string;
    sex: string;
    age: number;
    profession: string;
    bodyType: string;
    size: string;
    country: string;
    styleType: string;
    styleDescription: string;
    colors: string[];
    outfits: Outfit[];
    basicItems: Prenda[];
    tips: string[];
  }