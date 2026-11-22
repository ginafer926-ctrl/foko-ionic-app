export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  completada: boolean;
  creadaEn: number;
}

export interface Habito {
  id: string;
  nombre: string;
  completadoHoy: boolean;
  racha: number;
}
