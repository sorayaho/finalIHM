import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {PatientInterface} from "../dataInterfaces/patient";
import {Adresse} from '../dataInterfaces/adresse';

@Component({
  selector: 'app-modifier-patient',
  templateUrl: './modifier-patient.component.html',
  styleUrls: ['./modifier-patient.component.css']
})
export class ModifierPatientComponent implements OnInit {
  NumSecuriteSocial:string;
  PatientForm: FormGroup;



  private _cms: CabinetInterface;
  public get cms(): CabinetInterface {
    return this._cms;
  }


  constructor(public cabinetMedicalService: CabinetMedicalService, private formBuilder: FormBuilder,private router: Router,
              private route: ActivatedRoute) {

    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log(this.cms);
  }

  /*-------------Initialisation du formulaire------------ */
  initForm() {

    this.PatientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prénom: ['', Validators.required],
      sexe: ['', Validators.required],
      numéro: ['', Validators.required],
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      étage: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.NumSecuriteSocial=this.route.snapshot.params['id'];
    this.initForm();


  }

  /*-------------Récupérer le numéro de sécurité sociale du patient ----------*/

  get_numSecuriteSociale(item): string {

    return item.numéroSécuritéSociale;

  }

/* -----------------Cette méthode permet de modifier les informatiosn d'un patient en utilisant la variable de type FormGroup qui représente
         les valeurs récupérer du formulaire, ensuite la fonction ajouter déclarer dans le service cabinat -------------- */

  Modifier_Patient()
  {
    const formValue = this.PatientForm.value;
    const NumSécuritéSocial=this.route.snapshot.params['id'];
    let patient: PatientInterface = this.cabinetMedicalService.getPatientBy_NumSécuritéSocial(NumSécuritéSocial);
    const add: Adresse = {
      numéro: formValue['numéro'],
      rue: formValue['rue'],
      codePostal: formValue['codePostal'],
      ville: formValue['ville'],
      étage: formValue['étage']
    };
    patient = {
        nom: formValue['nom'],
        prénom: formValue['prénom'],
        sexe: formValue['sexe'],
      numéroSécuritéSociale:NumSécuritéSocial,
        adresse: add
      };
    let date_naissance: string = formValue['dateN'];
    this.cabinetMedicalService.ajouter(patient, date_naissance);
    this.router.navigate(['/patient']);
  }



}






