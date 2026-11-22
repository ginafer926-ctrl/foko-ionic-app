import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar,
  IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel, IonRouterOutlet
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink, IonApp, IonSplitPane, IonMenu, IonHeader,
    IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle,
    IonItem, IonLabel, IonRouterOutlet
  ],
  template: `
    <ion-app>
      <ion-split-pane contentId="main-content">
        <ion-menu contentId="main-content" type="overlay">
          <ion-header>
            <ion-toolbar>
              <ion-title>Menú FoKo</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list>
              <ion-menu-toggle auto-hide="false">
                <ion-item routerLink="/dashboard" routerDirection="root">
                  <ion-label>1. Tablero (Dashboard)</ion-label>
                </ion-item>
                <ion-item routerLink="/tareas" routerDirection="root">
                  <ion-label>2. Gestión de Tareas</ion-label>
                </ion-item>
                <ion-item routerLink="/habitos" routerDirection="root">
                  <ion-label>3. Hábitos Diarios</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>
        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
    </ion-app>
  `
})
export class AppComponent {}
