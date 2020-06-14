import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionsortComponent } from './insertionsort.component';

describe('InsertionsortComponent', () => {
  let component: InsertionsortComponent;
  let fixture: ComponentFixture<InsertionsortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertionsortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
