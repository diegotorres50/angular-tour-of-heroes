import { Component } from '@angular/core';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-app',
  template: `
     <h1>{{title}}</h1>
     <nav>
       <a routerLink="/dashboard">Dashboard</a>
       <a routerLink="/heroes">Heroes</a>
     </nav>
     <!--
       - <router-outlet> es una directiva que le indica al rutero donde visualizar el componente
       inmediatamente despues de donde este la etiquete <router-outlet>
     -->
     <router-outlet></router-outlet>
   `,
   // Para que los hijos del componente usen la inyeccion del servicio
   providers: [HeroService]
})
export class AppComponent {
  title = 'Tour of Heroes';
}