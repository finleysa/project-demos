import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadthfirstsearchComponent } from './breadthfirstsearch.component';

describe('BreadthfirstsearchComponent', () => {
  let component: BreadthfirstsearchComponent;
  let fixture: ComponentFixture<BreadthfirstsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadthfirstsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadthfirstsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
