import { Recipe } from './recipe.interface';
import { RecipeBook } from './recipebook.interface';

export interface State {
  selectedRecipeBook: RecipeBook;
  selectedRecipe: Recipe;
}
