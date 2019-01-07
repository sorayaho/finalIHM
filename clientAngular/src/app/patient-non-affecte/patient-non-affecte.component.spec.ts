import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNonAffecteComponent } from './patient-non-affecte.component';

describe('PatientNonAffecteComponent', () => {
  let component: PatientNonAffecteComponent;
  let fixture: ComponentFixture<PatientNonAffecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientNonAffecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNonAffecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
