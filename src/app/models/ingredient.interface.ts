import { Food } from './food.interface';

export interface Ingredient {
  id?: string;
  amount: number;
  style?: IngredientStyle;
  food: Food;
}

export enum IngredientStyle {
  g = 'g',
  ml = 'ml',
  Prise = 'Prise',
  kg = 'kg',
  unze = 'unze',
  TL = 'TL',
  EL = 'EL'
}
