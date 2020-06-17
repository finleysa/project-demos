import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadixsortComponent } from './radixsort.component';

describe('RadixsortComponent', () => {
  let component: RadixsortComponent;
  let fixture: ComponentFixture<RadixsortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadixsortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadixsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
