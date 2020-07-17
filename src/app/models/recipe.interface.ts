import { Ingredient } from './ingredient.interface';

export interface Recipe {
  id?: string;
  title?: string;
  description?: string;
  pictureUrl?: string;
  ingredientList?: Ingredient[];
  recipebookId?: string;
  notes?: string;
}
