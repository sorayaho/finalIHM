import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material';
import { PatientComponent } from './patient/patient.component';
import {RouterModule, Routes} from '@angular/router';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { InfirmierComponent } from './infirmier/infirmier.component';
import { ErreurComponent } from './erreur/erreur.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifierPatientComponent } from './modifier-patient/modifier-patient.component';
import { PatientNonAffecteComponent } from './patient-non-affecte/patient-non-affecte.component';
import { AffecterPatientComponent } from './affecter-patient/affecter-patient.component';





//Routing creation des paths pour les urls
const appRoutes: Routes = [
  { path: 'patient', component: PatientComponent },
  { path: 'patient/:id', component: ModifierPatientComponent },
  { path: 'patientNonAffecte', component: PatientNonAffecteComponent },
  { path: 'patientNonAffecte/:numSecuriteSoc', component: AffecterPatientComponent },

  { path: 'infirmier',component: InfirmierComponent},
  { path: 'addpatient',component: AddpatientComponent},
  { path: 'accueil', component: SecretaryComponent },
  { path: 'modifier/:id', component: ModifierPatientComponent },

  //localhost :4200
  { path: '', component: SecretaryComponent },
 { path: 'not-found', component: ErreurComponent },
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    PatientComponent,
    AddpatientComponent,
    InfirmierComponent,
    ErreurComponent,
    ModifierPatientComponent,
    PatientNonAffecteComponent,
    AffecterPatientComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    // tous les routes enregistrés se trouve dans la constante appRoute
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }


