/**
 Siempre que defina un componente, importamos 'Component'.

 Para importar mas de una clase del core, usamos separación por ',' comas.

 OnInit es una interface para usar un hook al crear este componente.
 */
import { Component, OnInit } from '@angular/core';

// Para usar el metodo navigate() del rutero
import { Router } from '@angular/router';

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
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
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
    constructor(
    // Para el rutero.
    private router: Router,
    // Para el data service
    private heroService: HeroService) { }

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

  /*
   The HeroesComponent navigates to the HeroesDetailComponent in response to a button click. The button's click event is bound to a gotoDetail() method that navigates imperatively by telling the router where to go.
   */
  gotoDetail(): void {
    /*
     Note that you're passing a two-element link parameters array—a path and the route parameter—to the router navigate() method, just as you did in the [routerLink] binding back in the DashboardComponent.
     */
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  // In response to a click event, call the component's click handler and then clear the input field so that it's ready for another name.
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  // In addition to calling the component's delete() method, the delete button's click handler code stops the propagation of the click event—you don't want the <li> click handler to be triggered because doing so would select the hero that the user will delete.
  // Of course you delegate hero deletion to the hero service, but the component is still responsible for updating the display: it removes the deleted hero from the array and resets the selected hero, if necessary.
  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }
}