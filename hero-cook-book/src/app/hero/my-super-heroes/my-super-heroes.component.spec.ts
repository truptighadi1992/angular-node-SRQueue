import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySuperHeroesComponent } from './my-super-heroes.component';

describe('MySuperHeroesComponent', () => {
  let component: MySuperHeroesComponent;
  let fixture: ComponentFixture<MySuperHeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySuperHeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySuperHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
