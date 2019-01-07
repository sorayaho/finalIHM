
import { Component, OnInit } from '@angular/core';
import { CabinetMedicalService } from './../cabinet-medical.service';
import { CabinetInterface } from '../dataInterfaces/cabinet';
import {Adresse} from '../dataInterfaces/adresse';

import { sexeEnum } from '../dataInterfaces/sexe';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {PatientInterface} from "../dataInterfaces/patient";
//import {generateErrorMessage} from "codelyzer/angular/styles/cssLexer";


@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})

export class AddpatientComponent implements OnInit {

  PatientForm: FormGroup;
  errorMessage: string;

  private _cms: CabinetInterface;
  public get cms(): CabinetInterface {
    return this._cms;
  }


  constructor(public cabinetMedicalService: CabinetMedicalService, private formBuilder: FormBuilder,
              private router: Router) {

    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
  }

  /*-------------Initialisation du formulaire------------ */

  initForm() {
    this.PatientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prénom: ['', Validators.required],
      numéroSécuritéSociale: ['', Validators.required],
      sexe: ['', Validators.required],
      numéro: ['', Validators.required],
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      étage: ['', Validators.required]
    });
  }


  ngOnInit() {

    this.initForm()

  }


  /*------------Cette méthode permet d'ajouter un patient , en récupérant les informations du patient depuis le formulaire-------------*/

   Ajouter_Patient() {

     const formValue = this.PatientForm.value;
     const add: Adresse = {
       numéro: formValue['numéro'],
       rue: formValue['rue'],
       codePostal: formValue['codePostal'],
       ville: formValue['ville'],
       étage: formValue['étage']
     };
     const new_patient: PatientInterface = {
       nom: formValue['nom'],
       prénom: formValue['prénom'],
       sexe: formValue['sexe'],

       numéroSécuritéSociale: formValue['numéroSécuritéSociale'],
       adresse: add
     };


     let date_naissance: string = formValue['Date_naissance'];

     //  je vérifies si le patient n'existe pas dans la liste des patients , ensuite je l'ajoutes en appelant la méthode ajouter du service

       if (this.cabinetMedicalService.existence_patient(new_patient)) {

       this.cabinetMedicalService.ajouter(new_patient, date_naissance);
       this.router.navigate(['patientNonAffecte']);
       }

       else {
         this.errorMessage = " Erreur !! Ce patient existe déjà ";
       }


     }

     /*------------------------------Cette méthode permet de vérifier le sexe du patient ---------------------------*/

  get_Sexe(item): string {
    var femme = "F";
    var homme = "H";
    if (item.sexe == 1) {
      return femme;
    } else {
      return homme;
    }

  }



}

