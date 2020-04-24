import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSrComponent } from './create-sr.component';

describe('CreateSrComponent', () => {
  let component: CreateSrComponent;
  let fixture: ComponentFixture<CreateSrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
