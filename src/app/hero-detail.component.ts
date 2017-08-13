/**
 Siempre que defina un componente, importamos 'Component'.

 Para importar mas de una clase del core, usamos separación por ',' comas.

 Input se usa para indicar que el componente recibira valores desde un componente padre.
 */
import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div>
        <label>id: </label>{{hero.id}}
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `
})
export class HeroDetailComponent {
  // hero es una propiedad que sera seteada por valores que el componente padre le pase.
  @Input() hero: Hero;
}