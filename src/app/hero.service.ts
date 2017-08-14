import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
      return this.http.get(this.heroesUrl)
                 .toPromise()
                 .then(response => response.json().data as Hero[])
                 .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    // Simula una respuesta demorada con una promesa
    getHeroesSlowly(): Promise<Hero[]> {
      return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getHeroes()), 2000);
      });
    }

    // When the HeroDetailComponent asks the HeroService to fetch a hero, the HeroService currently fetches all heroes and filters for the one with the matching id. That's fine for a simulation, but it's wasteful to ask a real server for all heroes when you only want one. Most web APIs support a get-by-id request in the form api/hero/:id (such as api/hero/11).
    getHero(id: number): Promise<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Hero)
        .catch(this.handleError);
    }

    private headers = new Headers({'Content-Type': 'application/json'});

    // The overall structure of the update() method is similar to that of getHeroes(), but it uses an HTTP put() to persist server-side changes.
    update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}/${hero.id}`;
      return this.http
        .put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(() => hero)
        .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
      return this.http
        .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Hero)
        .catch(this.handleError);
    }

    // delete() method, which uses the delete() HTTP method to remove the hero from the server.
    delete(id: number): Promise<void> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
