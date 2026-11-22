import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
  IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem,
  IonCheckbox, IonButton, IonFab, IonFabButton, IonModal, IonInput, IonTextarea
} from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    FormsModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
    IonContent, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonList,
    IonItem, IonCheckbox, IonButton, IonFab, IonFabButton, IonModal, IonInput, IonTextarea
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Gestión de Tareas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-searchbar placeholder="Buscar tarea..." (ionInput)="textoBusqueda.set($any($event).target.value || '')"></ion-searchbar>

      <ion-segment [value]="filtroEstado()" (ionChange)="filtroEstado.set($any($event).detail.value)">
        <ion-segment-button value="todas"><ion-label>Todas</ion-label></ion-segment-button>
        <ion-segment-button value="pendientes"><ion-label>Pendientes</ion-label></ion-segment-button>
        <ion-segment-button value="completadas"><ion-label>Hechas</ion-label></ion-segment-button>
      </ion-segment>

      <ion-list>
        @for (tarea of tareasFiltradas(); track tarea.id) {
          <ion-item>
            <ion-checkbox slot="start" [checked]="tarea.completada" (ionChange)="storage.alternarEstadoTarea(tarea.id)"></ion-checkbox>
            <ion-label>
              <h2>{{ tarea.titulo }}</h2>
              <p>{{ tarea.descripcion }} | Vence: {{ tarea.fechaLimite }}</p>
            </ion-label>
            <ion-button slot="end" fill="clear" color="danger" (click)="storage.eliminarTarea(tarea.id)">
              Eliminar
            </ion-button>
          </ion-item>
        } @empty {
          <p class="ion-text-center">No hay tareas registradas en esta vista.</p>
        }
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button (click)="modalAbierto.set(true)">+</ion-fab-button>
      </ion-fab>

      <ion-modal [isOpen]="modalAbierto()" (didDismiss)="modalAbierto.set(false)">
        <ng-template>
          <ion-header>
            <ion-toolbar>
              <ion-title>Nueva Tarea</ion-title>
              <ion-buttons slot="end">
                <ion-button (click)="modalAbierto.set(false)">Cerrar</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ion-item>
              <ion-input label="Título" labelPlacement="stacked" [(ngModel)]="nuevoTitulo"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input label="Fecha límite" type="date" labelPlacement="stacked" [(ngModel)]="nuevaFecha"></ion-input>
            </ion-item>
            <ion-item>
              <ion-textarea label="Descripción" labelPlacement="stacked" [(ngModel)]="nuevaDescripcion"></ion-textarea>
            </ion-item>
            <ion-button expand="block" class="ion-margin-top" (click)="guardarNuevaTarea()">Guardar Tarea</ion-button>
          </ion-content>
        </ng-template>
      </ion-modal>
    </ion-content>
  `
})
export class TareasPage {
  storage = inject(StorageService);

  filtroEstado = signal<'todas' | 'pendientes' | 'completadas'>('todas');
  textoBusqueda = signal<string>('');
  modalAbierto = signal<boolean>(false);

  nuevoTitulo = '';
  nuevaFecha = '';
  nuevaDescripcion = '';

  tareasFiltradas = computed(() => {
    const estado = this.filtroEstado();
    const texto = this.textoBusqueda().toLowerCase().trim();

    return this.storage.tareas().filter(t => {
      const cumpleEstado =
        estado === 'todas' ||
        (estado === 'pendientes' && !t.completada) ||
        (estado === 'completadas' && t.completada);
      const cumpleTexto = !texto || t.titulo.toLowerCase().includes(texto);
      return cumpleEstado && cumpleTexto;
    });
  });

  guardarNuevaTarea(): void {
    if (!this.nuevoTitulo.trim()) return;
    this.storage.agregarTarea(this.nuevoTitulo, this.nuevaDescripcion, this.nuevaFecha || 'Sin fecha');
    this.nuevoTitulo = '';
    this.nuevaDescripcion = '';
    this.nuevaFecha = '';
    this.modalAbierto.set(false);
  }
}
