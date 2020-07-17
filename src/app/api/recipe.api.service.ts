import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  private _routeUrl: string = '/recipe';

  private _basePath: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Recipebooks

  public getAllRecipes(): Observable<Recipe[]> {
    // return of<StockVacation>(mockStockVacation);
    return this.http.get<Recipe[]>(this._basePath + this._routeUrl, httpOptions);
  }

  public deleteRecipeEntry(id: string): Observable<void> {
    return this.http.delete<void>(this._basePath + this._routeUrl + id, httpOptions);
  }

  public postRecipeEntry(addedRecipe: Recipe, recipebookid: string): Observable<Recipe> {
    return this.http.post<Recipe>(this._basePath + this._routeUrl + '/' + recipebookid + '/recipe', addedRecipe, httpOptions);
  }

  public updateRecipe(updatedRecipe: Recipe, recipebookid: string, updatedrecipeid: string): Observable<Recipe> {
    return this.http.put<Recipe>(this._basePath + this._routeUrl + '/' + recipebookid + '/recipe/' + updatedrecipeid,
     updatedRecipe, httpOptions);
  }

  public getRecipeByTitle(title: string) {
    return this.http.get<Recipe>(this._basePath + this._routeUrl + '/title/' + title, httpOptions);
  }

  public getRecipeById(id: string) {
    return this.http.get<Recipe>(this._basePath + this._routeUrl + '/title/' + id, httpOptions);
  }

  public deleteRecipeById(id: string) {
    return this.http.delete<void>(this._basePath + this._routeUrl + '/' + id, httpOptions);
  }
}
