import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../models/state.interface';
import { Recipe } from '../models/recipe.interface';
import { RecipeBook } from '../models/recipebook.interface';

export enum stateActions {
  setselectedrecipebook = 'setSelectedRecipebook',
  setselectedrecipe = 'setSelectedRecipe',
  unsetselectedrecipebook = 'unSetSelectedRecipebook',
  unsetselectedrecipe = 'unSetSelectedRecipe',
  setselectedrecipeandbook = 'unSetSelectedRecipeandbook'
}
@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$$: BehaviorSubject<State> = new BehaviorSubject<State>({
    selectedRecipeBook: undefined,
    selectedRecipe: undefined
  });
  public state$: Observable<State> = this._state$$.asObservable();

  constructor() { }

  public dispatch(action: stateActions, payload?: any, payload2?: any): void {
    switch (action) {
      case stateActions.setselectedrecipe:
        this.setSelectedRecipe(payload);
        break;
      case stateActions.unsetselectedrecipe:
        this.unSetSelectedRecipe();
        break;
      case stateActions.setselectedrecipebook:
        this.setSelectedRecipeBook(payload);
        break;
      case stateActions.unsetselectedrecipebook:
        this.unSetSelectedRecipeBook();
        break;
      case stateActions.setselectedrecipeandbook:
        this.setSelectedRecipeBookAndRecipe(payload, payload2);
        break;
    }
  }

  public getState(): Observable<State> {
    return this.state$;
  }

  private setSelectedRecipe(recipe: Recipe): void {
    const state: State = this._state$$.value;
    state.selectedRecipe = recipe;
    this._state$$.next(state);
  }

  private unSetSelectedRecipe(): void {
    const state: State = this._state$$.value;
    state.selectedRecipe = undefined;
    this._state$$.next(state);
  }

  private setSelectedRecipeBook(recipebook: RecipeBook): void {
    const state: State = this._state$$.value;
    state.selectedRecipeBook = recipebook;
    this._state$$.next(state);
  }

  private unSetSelectedRecipeBook(): void {
    const state: State = this._state$$.value;
    state.selectedRecipeBook = undefined;
    this._state$$.next(state);
  }

  private setSelectedRecipeBookAndRecipe(recipebook: RecipeBook, recipe: Recipe): void {
    const state: State = this._state$$.value;
    state.selectedRecipeBook = recipebook;
    state.selectedRecipe = recipe;
    this._state$$.next(state);
  }

}
