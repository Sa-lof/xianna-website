export interface Blog {
    id: number;
    titulo: string;
    descripcion: string;
    contenido: string;
    image: string;
    name: string;
    category: string;
    rating: number;
    persons: number;
    id_categoria: number;
    images: string[];
}
  

export interface ImageFileWithPreview {
    file: File;
    preview: string;
  }