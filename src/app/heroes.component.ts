/**
 Siempre que defina un componente, importamos 'Component'.

 Para importar mas de una clase del core, usamos separación por ',' comas.

 OnInit es una interface para usar un hook al crear este componente.
 */
import { Component, OnInit } from '@angular/core';

// Hero es una clase que define la estructura de datos de un hero.
import { Hero } from './hero';

// Importamos el data service que provee la lista de heroes y que sera inyectado aqui.
import { HeroService } from './hero.service';

/**
 @Component es un patron de diseño 'decorator' que permite señalar esta clase como un componente de aungular,
 asi mismo el decorador provee la metadata adicional que determinada como este compente
 sera procesado, instanciado y usado.

 El decorador como patron de diseño extienede una función mediante otra funcion sin tocar la funcion original.

 Un componente angular se compone de un template 'vista', una clase 'controlador' y una función decoradora que en ultimas relaciona el javascript con el html, esto es como ver el modelo MVC.
 */
@Component({
  // Para identificar el componente del lado del html.
  selector: 'my-heroes',
  // El html o vista del componente.
  template: `
    <h2>My Heroes</h2>
    <ul class="heroes">
      <!--
        - *ngFor es una directiva para iterar.
        - let se usa para declarar variable hero.
        - heroes es una propiedad definida en la clase.
        - selected es un stilo CSS del componente.
        - selectedHero es una propiedad definida en la clase.
        - onSelect es un metodo definido en la clase.
        - (click) es un evento del componente.
      -->
      <li *ngFor="let hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <!--
      - <hero-detail> es un selector de otro componente, en teoria no requiere ser importado con 'import {}'.
      - [hero] es una propiedad de entrada '@input' del componente hijo <hero-detail>.
      - selectedHero es un valor de la propiedad del componente padre que se pasa al hijo.
    -->
    <hero-detail [hero]="selectedHero"></hero-detail>
  `,
  // Los estilos CSS del componente solo afectaran al componente.
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})

/**
 Esta es la clase principal del component que es como el 'controller'.

 El estandar del nombre es UpperCamelCase y termina en 'Component'.

 Usar 'export' para que pueda ser importado desde otros componentes si los hubiera como padres.

 OnInit es una interface para usar un hook al crear este componente, este hook lo que hace es ejecutar algo durante la creacion del componente.
 */
export class HeroesComponent implements OnInit {
  // Las siguientes son propiedades 'variables o constantes' que se usaran en el html del componente.

  // Variable 'title'.
  title = 'Tour of Heroes';

  // heroes es la lista, es del tipo de dato definido en la clase Hero y a su vez espera ser un array para dicha lista.
  heroes: Hero[];

  // Es el valor del 'hero' seleccionado por un usuario y se define su valor mediante el metodo onSelect().
  selectedHero: Hero;

  /*
   Para inyectar el servicio de datos debemos definir el constructor con una variable privada del tipo del servicio.

   El proposito del construvtor es solo inicializar el servicio y asociar propiedades del componente.
   */
  constructor(private heroService: HeroService) { }

  // Definimos un metodo en el componente que trae los datos del servicio, es decir la lista de heroes.
  getHeroes(): void {
    // this.heroService.getHeroes() es el metodo definido en el servicio o clase HeroService.
    // then() responde bajo el concepto de promesa.
    /*
     heroes => this.heroes = heroes; es una funcion callback del servicio y es una funccion arrow equivalente a:

     function (heroes) {
       this.heroes = heroes
     }

     donde:

       - el parametro 'heroes' de la funcion, es el data que devuelve el callback del servicio.
       - this.heroes es la propiedad local del componente.
     */
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  // ngOnInit() es un hook que se ejecuta de manera automatica cada vez que se crea este componente.
  ngOnInit(): void {
    // Este metodo local es el que se encarga de llamar al metodo del servicio que trae la lista de heroes.
    this.getHeroes();
  }

  /*
   onSelect metodo que se lanza cuando el usuario hace click sobre un hero.
   @param hero Hero
   */
  onSelect(hero: Hero): void {
    // Guarda el valor de hero seleccionado en la propiedad local 'selectedHero'
    this.selectedHero = hero;
  }
}