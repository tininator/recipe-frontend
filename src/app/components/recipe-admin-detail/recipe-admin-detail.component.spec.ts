import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAdminDetailComponent } from './recipe-admin-detail.component';

describe('RecipeAdminDetailComponent', () => {
  let component: RecipeAdminDetailComponent;
  let fixture: ComponentFixture<RecipeAdminDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeAdminDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
