import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecipeBook } from '../models/recipebook.interface';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecipebookApiService {

  private _routeUrl: string = '/recipebook';

  private _basePath: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Recipebooks

  public getAllRecipeBooks(): Observable<RecipeBook[]> {
    // return of<StockVacation>(mockStockVacation);
    return this.http.get<RecipeBook[]>(this._basePath + this._routeUrl, httpOptions);
  }

  public deleteRecipeBookEntry(id: string): Observable<void> {
    return this.http.delete<void>(this._basePath + this._routeUrl + id, httpOptions);
  }

  public postRecipeBookEntry(recipebook: RecipeBook): Observable<RecipeBook> {
    return this.http.post<RecipeBook>(this._basePath + this._routeUrl, recipebook, httpOptions);
  }

  public updateRecipeBookTitle(updatedTitle: string, updatedid: string): Observable<RecipeBook> {
    return this.http.put<RecipeBook>(this._basePath + this._routeUrl + '/title/' + updatedid, updatedTitle, httpOptions);
  }

  public getRecipeBookByTitle(title: string) {
    return this.http.get<RecipeBook>(this._basePath + this._routeUrl + '/title/' + title, httpOptions);
  }

  public getRecipeBookById(id: string) {
    return this.http.get<RecipeBook>(this._basePath + this._routeUrl + '/title/' + id, httpOptions);
  }

  public deleteRecipeBookById(id: string) {
    return this.http.delete<void>(this._basePath + this._routeUrl + '/' + id, httpOptions);
  }
}
