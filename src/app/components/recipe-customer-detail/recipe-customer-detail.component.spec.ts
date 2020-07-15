import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCustomerDetailComponent } from './recipe-customer-detail.component';

describe('RecipeCustomerDetailComponent', () => {
  let component: RecipeCustomerDetailComponent;
  let fixture: ComponentFixture<RecipeCustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
