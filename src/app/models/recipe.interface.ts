import { Ingredient } from './ingredient.interface';
import { ExecFileOptionsWithBufferEncoding } from 'child_process';

export interface Recipe {
  id?: string;
  title?: string;
  description?: string;
  pictureUrl?: string;
  ingredientList?: Ingredient[];
  recipebookId?: string;
  notes?: string;
  fileInfo?: FileInfo;
}

export interface FileInfo {
  name?: string;
  url?: string;
}
