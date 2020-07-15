import { Food } from './food.interface';

export interface Ingredient {
  id?: string;
  amount: number;
  style: IngredientStyle;
  food: Food;
}

export enum IngredientStyle {

}
