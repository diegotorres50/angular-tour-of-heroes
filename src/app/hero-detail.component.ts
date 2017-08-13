/**
 Siempre que defina un componente, importamos 'Component'.

 Para importar mas de una clase del core, usamos separación por ',' comas.

 Input se usa para indicar que el componente recibira valores desde un componente padre.
 */
// Keep the Input import for now, you'll remove it later:
import { Component, OnInit } from '@angular/core';

// Esto es para recibir el id del hero como un parametro de la url /detail/:id
/*
 You'll no longer receive the hero in a parent component property binding.
 The new HeroDetailComponent should take the id parameter from the paramMap Observable in the ActivatedRoute service and use the HeroService to fetch the hero with that id.
 */
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';

// Import the switchMap operator to use later with the route parameters Observable.
import 'rxjs/add/operator/switchMap';

// Podemos sacar el html del componente a un archivo propio.
@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})

// Tell the class to implement the OnInit interface.
// El OnInit method se ejecurara cada vez que se cree este componente.
export class HeroDetailComponent implements OnInit {
  // Inject the ActivatedRoute, HeroService, and Location services into the constructor, saving their values in private fields:
  constructor(
    // Esto es para consumir el data service inyectado en el constructor
    private heroService: HeroService,
    // Esto es para recibir el id del hero como un parametro de la url /detail/:id
    private route: ActivatedRoute,
    // Esto es para usar la memoria del navegador mientras navega
    private location: Location
  ) {}

  // Inside the ngOnInit() lifecycle hook, use the paramMap Observable to extract the id parameter value from the ActivatedRoute service and use the HeroService to fetch the hero with that id.
  ngOnInit(): void {
    // paramMap es usado para obtener los parametros de la url enviados.
    // +params, el plus (+) es usado en javascript para convertir de string a number
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }

  // Este metodo es usado para acceder al historial de navegacion y llamarlo en el click de un boton.
  goBack(): void {
    this.location.back();
  }
}