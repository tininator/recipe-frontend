import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { State } from 'src/app/models/state.interface';
import { RecipeBook } from 'src/app/models/recipebook.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipebookParam: string;
  recipeBook: RecipeBook;

  constructor(private readonly router: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly stateService: StateService) {
                this.activeRoute.params.subscribe((params: Params) => {
                  this.recipebookParam = params['book'];
                });
              }

  ngOnInit() {
    this.stateService.getState().subscribe((state: State) => {
      console.log(state)
      if (state && state.selectedRecipeBook) {
        this.recipeBook = state.selectedRecipeBook;
      } else {
        this.router.navigate(['/recipebooks']);
      }
    });
  }

}
