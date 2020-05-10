import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuperHeroComponent } from './create-super-hero.component';

describe('CreateSuperHeroComponent', () => {
  let component: CreateSuperHeroComponent;
  let fixture: ComponentFixture<CreateSuperHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSuperHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuperHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
