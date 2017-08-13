import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
    getHeroes(): Promise<Hero[]> {
      return Promise.resolve(HEROES);
    }

    // Simula una respuesta demorada con una promesa
    getHeroesSlowly(): Promise<Hero[]> {
      return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getHeroes()), 2000);
      });
    }

    // getHero() method that filters the heroes list from getHeroes() by id.
    // Este metodo es clave para las rutas dinamicas '/detail/:id'.
    getHero(id: number): Promise<Hero> {
      return this.getHeroes()
                 .then(heroes => heroes.find(hero => hero.id === id));
    }
}
