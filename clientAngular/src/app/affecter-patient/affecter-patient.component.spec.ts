import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterPatientComponent } from './affecter-patient.component';

describe('AffecterPatientComponent', () => {
  let component: AffecterPatientComponent;
  let fixture: ComponentFixture<AffecterPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffecterPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
