import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RecipeBook } from '../models/recipebook.interface';
import { RecipeApiService } from '../api/recipe.api.service';
import { RecipebookApiService } from '../api/recipebook.api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipebookService {

  private _recipeBooks$$: BehaviorSubject<RecipeBook[]> = new BehaviorSubject<RecipeBook[]>(undefined);
  public recipeBooks$: Observable<RecipeBook[]> = this._recipeBooks$$.asObservable();

  constructor(private readonly recipeController: RecipebookApiService) {
    this.recipeController.getAllRecipeBooks().subscribe((rb: RecipeBook[]) => {
      this._recipeBooks$$.next(rb);
    });
  }

  public getRecipeBooks(): Observable<RecipeBook[]> {
    return this.recipeBooks$;
  }
}
