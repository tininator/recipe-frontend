import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StateService, stateActions } from 'src/app/services/state.service';
import { State } from 'src/app/models/state.interface';
import { Ingredient, IngredientStyle } from 'src/app/models/ingredient.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { RecipebookService } from 'src/app/services/recipebook.service';
import { RecipebookApiService } from 'src/app/api/recipebook.api.service';
import { RecipeApiService } from 'src/app/api/recipe.api.service';
import { RecipeBook } from 'src/app/models/recipebook.interface';
import { Subscription, Observable } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { UploadFileService, FileResponse } from 'src/app/services/upload-file.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-recipe-admin-detail',
  templateUrl: './recipe-admin-detail.component.html',
  styleUrls: ['./recipe-admin-detail.component.scss']
})
export class RecipeAdminDetailComponent implements OnInit, OnDestroy {

  public recipeForm: FormGroup;
  public ingredientForm: FormGroup;
  public ingredientArray: FormArray;

  public recipeParam: string;
  public recipeBookParam: string;
  public recipe: Recipe;

  public selectedRecipeBook: RecipeBook;

  public tempImageUrlForAdding: string;

  public keys = Object.keys;
  enumtypes = IngredientStyle;

  private stateSubscription: Subscription;

  private imageWasChanged = false;

  // IMAGE UPLOAD PROPERTIES

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  imgURL: any;
  public message2: string;
  fileInfos: Observable<any>;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly recipeBookService: RecipebookService,
              private readonly snackBarService: SnackbarService,
              private readonly dialogService: DialogService,
              private readonly uploadService: UploadFileService,
              private readonly stateService: StateService) {
                this.activeRoute.params.subscribe((params: Params) => {
                  this.recipeBookParam = params.book;
                });
              }

  ngOnInit() {
    this.buildRecipeForm();
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      console.log('ADMIN', state);
      if (state.selectedRecipeBook) {
        this.selectedRecipeBook = state.selectedRecipeBook;
      } else {
        this.router.navigate(['/recipebooks']);
      }

      if (state && state.selectedRecipe) {
        this.recipe = state.selectedRecipe;
        this.setRecipeFormValues(this.recipe);
      }
    });
  }

  public buildRecipeForm(): void {
    this.recipeForm = this.formBuilder.group(
      {
        title: this.formBuilder.control('', Validators.required),
        description: this.formBuilder.control(''),
        notes: this.formBuilder.control(''),
        ingredientList: this.formBuilder.array([])
      }
    );
  }

  public initIngredients(ingredients?: Ingredient[]): void {
    this.ingredientArray = this.recipeForm.get('ingredientList') as FormArray;
    ingredients.forEach((ingr: Ingredient) => {
      this.ingredientArray.push(this.addIngredient(ingr));
    });
  }

  public setRecipeFormValues(recipe: Recipe): void {
    this.recipeForm = this.formBuilder.group(
      {
        title: new FormControl(recipe.title),
        description: new FormControl(recipe.description),
        notes: new FormControl(recipe.notes),
        ingredientList: this.formBuilder.array([
        ])
      }
    );
    this.initIngredients(recipe.ingredientList);
  }

  public addEmptyIngredient(): void {
    this.ingredientArray = this.recipeForm.get('ingredientList') as FormArray;
    const group: FormGroup = this.formBuilder.group(
      {
        amount: [],
        style: [],
        food: this.formBuilder.group(
          {
            name: []
          }
        )
      }
    );
    this.ingredientArray.push(group);
  }

  public addIngredient(ingredient: Ingredient): FormGroup {
    return this.formBuilder.group(
      {
        amount: new FormControl(ingredient.amount),
        style: new FormControl(ingredient.style),
        food: this.formBuilder.group(
          {
            name: new FormControl(ingredient.food.name, Validators.required)
          }
        )
      }
    );
  }

  public deleteIngredient(index: number): void {
    this.ingredientArray.removeAt(index);
  }

  public addRecipe(): void {
    if (this.imageWasChanged) {
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.uploadFile(this.selectedFiles.item(0)).subscribe((f: FileResponse) => {
        const recipeTemp: Recipe = this.recipeForm.value;
        recipeTemp.pictureUrl = f.uri;
        this.recipeBookService.addRecipe(recipeTemp, this.selectedRecipeBook.id).subscribe((r: Recipe) => {
          this.recipeBookService.addRecipeLocal(r);
          this.selectedFiles = undefined;
          this.snackBarService.openSnackBar('Rezept hinzugefügt');
          this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
        }, error => this.snackBarService.openSnackBar('Fehler beim Hinzufügen eines Rezeptes'));
      }, error => this.snackBarService.openSnackBar('Fehler beim Hochladen des Bildes'));
    } else {
      const recipeTemp: Recipe = this.recipeForm.value;
      this.recipeBookService.addRecipe(recipeTemp, this.selectedRecipeBook.id).subscribe((r: Recipe) => {
        this.recipeBookService.addRecipeLocal(r);
        this.selectedFiles = undefined;
        this.snackBarService.openSnackBar('Rezept hinzugefügt');
        this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
      }, error => this.snackBarService.openSnackBar('Fehler beim Hinzufügen eines Rezeptes'));
    }
  }

  public editRecipe(): void {
    if (this.imageWasChanged) {
      this.currentFile = this.selectedFiles.item(0);
      this.uploadService.uploadFile(this.selectedFiles.item(0)).subscribe((f: FileResponse) => {
          const recipeTemp: Recipe = this.recipeForm.value;
          recipeTemp.pictureUrl = f.uri;
          this.recipeBookService.editRecipe(recipeTemp, this.selectedRecipeBook.id, this.recipe.id).subscribe((r: Recipe) => {
            this.recipeBookService.editRecipeLocal(r);
            this.selectedFiles = undefined;
            this.snackBarService.openSnackBar('Rezept aktualisiert');
            this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
          }, error => this.snackBarService.openSnackBar('Fehler beim Aktualisieren des Rezeptes'));
        }, error => this.snackBarService.openSnackBar('Fehler beim Hochladen des Bildes'));
      } else {
        const recipeTemp: Recipe = this.recipeForm.value;
        recipeTemp.pictureUrl = this.recipe.pictureUrl;
        this.recipeBookService.editRecipe(recipeTemp, this.selectedRecipeBook.id, this.recipe.id).subscribe((r: Recipe) => {
          this.recipeBookService.editRecipeLocal(r);
          this.selectedFiles = undefined;
          this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
          this.snackBarService.openSnackBar('Rezept aktualisiert');
        }, error => this.snackBarService.openSnackBar('Fehler beim Aktualisieren des Rezeptes'));
      }
  }

  public deleteRecipe(): void {
    this.dialogService.openDialog('Willst du wirklich das Rezept löschen?').afterClosed().subscribe(result => {
      if (result) {
        this.recipeBookService.deleteRecipe(this.recipe.id).subscribe(() => {
          this.recipeBookService.deleteRecipeLocal(this.selectedRecipeBook.id, this.recipe.id);
          this.stateService.dispatch(stateActions.unsetselectedrecipe);
          this.snackBarService.openSnackBar('Rezept wurde gelöscht');
          this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
        });
      }
    }, error => this.snackBarService.openSnackBar('Fehler beim Löschen des Rezeptes'));
  }

  public return(): void {
    this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
  }

  public ngOnDestroy(): void {
    this.stateService.dispatch(stateActions.unsetselectedrecipe);
    this.stateSubscription.unsubscribe();
  }

  selectFile(eventS, event2) {
    this.imageWasChanged = true;
    if (eventS.length === 0) {
      return;
    }

    const mimeType = eventS[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message2 = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(eventS[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
    this.selectedFiles = event2.target.files;
  }
}
