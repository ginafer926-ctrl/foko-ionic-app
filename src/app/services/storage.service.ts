import { Injectable, signal, computed } from '@angular/core';
import { Tarea, Habito } from '../models/foko.models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TAREAS_KEY = 'foko_tareas_v1';
  private readonly HABITOS_KEY = 'foko_habitos_v1';

  // Estado reactivo local-first
  tareas = signal<Tarea[]>(this.cargarTareas());
  habitos = signal<Habito[]>(this.cargarHabitos());

  // Cálculo automático de progreso de tareas (Avance RF6)
  porcentajeTareas = computed(() => {
    const lista = this.tareas();
    if (lista.length === 0) return 0;
    const completadas = lista.filter(t => t.completada).length;
    return Math.round((completadas / lista.length) * 100);
  });

  private cargarTareas(): Tarea[] {
    const data = localStorage.getItem(this.TAREAS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private guardarTareas(lista: Tarea[]): void {
    localStorage.setItem(this.TAREAS_KEY, JSON.stringify(lista));
    this.tareas.set(lista);
  }

  private cargarHabitos(): Habito[] {
    const data = localStorage.getItem(this.HABITOS_KEY);
    return data ? JSON.parse(data) : [];
  }

  // RF1: Registrar nueva tarea localmente
  agregarTarea(titulo: string, descripcion: string, fechaLimite: string): void {
    const nueva: Tarea = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      fechaLimite,
      completada: false,
      creadaEn: Date.now()
    };
    this.guardarTareas([nueva, ...this.tareas()]);
  }

  // RF2: Alternar estado completada/pendiente
  alternarEstadoTarea(id: string): void {
    const actualizada = this.tareas().map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    this.guardarTareas(actualizada);
  }

  // RF3: Eliminar tarea localmente
  eliminarTarea(id: string): void {
    const filtrada = this.tareas().filter(t => t.id !== id);
    this.guardarTareas(filtrada);
  }
}
