import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RecipeBook } from '../models/recipebook.interface';
import { RecipeApiService } from '../api/recipe.api.service';
import { RecipebookApiService } from '../api/recipebook.api.service';
import { Recipe } from '../models/recipe.interface';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RecipebookService {

  private _recipeBooks$$: BehaviorSubject<RecipeBook[]> = new BehaviorSubject<RecipeBook[]>(undefined);
  public recipeBooks$: Observable<RecipeBook[]> = this._recipeBooks$$.asObservable();

  constructor(private readonly recipeBookController: RecipebookApiService,
              private readonly snackbarService: SnackbarService,
              private readonly recipeController: RecipeApiService) {
    this.recipeBookController.getAllRecipeBooks().subscribe((rb: RecipeBook[]) => {
      this._recipeBooks$$.next(rb);
    });
  }

  public getRecipeBooks(): Observable<RecipeBook[]> {
    return this.recipeBooks$;
  }

  public addRecipeBook(recipebook: RecipeBook): void {
    this.recipeBookController.postRecipeBookEntry(recipebook).subscribe((rb: RecipeBook) => {
      const recipebooks: RecipeBook[] = this._recipeBooks$$.value;
      recipebooks.push(rb);
      this._recipeBooks$$.next(recipebooks.slice());
      this.snackbarService.openSnackBar('Rezeptbuch erstellt');
    }, error => this.snackbarService.openSnackBar(error.error));
  }

  public editRecipeBookTitle(title: string, id: string): void {
    this.recipeBookController.updateRecipeBookTitle(title, id).subscribe((rb: RecipeBook) => {
      const recipebooks: RecipeBook[] = this._recipeBooks$$.value;
      const index: number = recipebooks.findIndex((r: RecipeBook) => r.id === id);
      recipebooks.splice(index, 1, rb);
      this._recipeBooks$$.next(recipebooks.slice());
      this.snackbarService.openSnackBar('Rezeptbuch aktualisiert');
    }, error => this.snackbarService.openSnackBar(error.error));
  }

  public deleteRecipeBook(id: string): void {
    this.recipeBookController.deleteRecipeBookById(id).subscribe(() => {
      const recipebooks: RecipeBook[] = this._recipeBooks$$.value;
      const index: number = recipebooks.findIndex((r: RecipeBook) => r.id === id);
      recipebooks.splice(index, 1);
      this._recipeBooks$$.next(recipebooks.slice());
      this.snackbarService.openSnackBar('Rezeptbuch gelöscht');
    }, error => this.snackbarService.openSnackBar(error.error));
  }

  public addRecipe(recipe: Recipe, recipebookid: string): void {
    this.recipeController.postRecipeEntry(recipe, recipebookid).subscribe((r: Recipe) => {
      const recipebooks: RecipeBook[] = this._recipeBooks$$.value;
      const recipebook: RecipeBook = recipebooks.find((rb: RecipeBook) => rb.id === r.recipebookId);
      if (recipebook && recipebook.recipeList) {
        recipebook.recipeList.push(r);
      } else {
        recipebook.recipeList = [];
        recipebook.recipeList.push(r);
      }
      this._recipeBooks$$.next(recipebooks.slice());
      this.snackbarService.openSnackBar('Rezept erstellt');
    }, error => this.snackbarService.openSnackBar(error.error));
  }

  public editRecipe(updatedRecipe: Recipe, recipebookid: string, id: string): void {
    this.recipeController.updateRecipe(updatedRecipe, recipebookid, id).subscribe((r: Recipe) => {
      const recipebooks: RecipeBook[] = this._recipeBooks$$.value;
      const recipebook: RecipeBook = recipebooks.find((rb: RecipeBook) => rb.id === r.recipebookId);
      const recipebookIndex: number = recipebooks.findIndex((rb: RecipeBook) => rb.id === r.recipebookId);
      const index: number = recipebook.recipeList.findIndex((re: Recipe) => re.id === r.id);
      recipebooks[recipebookIndex].recipeList.splice(index, 1, r);
      this._recipeBooks$$.next(recipebooks.slice());
      this.snackbarService.openSnackBar('Rezept aktualisiert');
    }, error => this.snackbarService.openSnackBar(error));
  }

  public deleteRecipe(recipebookid: string, id: string): void {
    this.recipeController.deleteRecipeById(id).subscribe(() => {
      const recipebooks: RecipeBook[] = this._recipeBooks$$.value;
      const recipebook: RecipeBook = recipebooks.find((rb: RecipeBook) => rb.id === recipebookid);
      const recipebookIndex: number = recipebooks.findIndex((rb: RecipeBook) => rb.id === recipebookid);
      const index: number = recipebook.recipeList.findIndex((re: Recipe) => re.id === id);
      recipebooks[recipebookIndex].recipeList.splice(index, 1);
      this._recipeBooks$$.next(recipebooks.slice());
      this.snackbarService.openSnackBar('Rezept gelöscht');
    }, error => console.log(error));
  }

}
