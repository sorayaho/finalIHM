import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPatientComponent } from './modifier-patient.component';

describe('ModifierPatientComponent', () => {
  let component: ModifierPatientComponent;
  let fixture: ComponentFixture<ModifierPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
