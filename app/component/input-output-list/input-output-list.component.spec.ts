import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputListComponent } from './input-output-list.component';

describe('InputOutputListComponent', () => {
  let component: InputOutputListComponent;
  let fixture: ComponentFixture<InputOutputListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputOutputListComponent]
    });
    fixture = TestBed.createComponent(InputOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
