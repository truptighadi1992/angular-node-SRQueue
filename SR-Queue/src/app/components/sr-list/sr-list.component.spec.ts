import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrListComponent } from './sr-list.component';

describe('SrListComponent', () => {
  let component: SrListComponent;
  let fixture: ComponentFixture<SrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
