import { Recipe } from './recipe.interface';

export interface RecipeBook {
  id?: string;
  title?: string;
  recipeList?: Recipe[];
}
