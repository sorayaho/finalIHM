import { Component, OnInit } from '@angular/core';
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {PatientInterface} from "../dataInterfaces/patient";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  private _cms: CabinetInterface;
  ErrorMessage: string;
  patientsAffected : PatientInterface[];
  public get cms(): CabinetInterface {
    return this._cms;
  }



  constructor(private formBuilder: FormBuilder ,private cabinetMedicalService: CabinetMedicalService, private router : Router) {
    this.initCabinet(cabinetMedicalService);
    console.log(this.cms);

  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log( this.cms);
  }

  public get patients(): CabinetInterface
  { return this._cms; }


  ngOnInit() {

  }


/*-------------Récupérer le nom et le prénom du patient ----------*/

  getNom_Prenom(item): string {
    return `${item.prénom} ${item.nom}`;
  }

  /*-------------Récupérer le numéro de l'adresse du patient ----------*/

  getAdresse_numero(item): string {
    var message="Pas de numéro";
    if(item.numéro != "") {
      return item.numéro;
    }
    else { return message; }
  }

  /*-------------Récupérer le numéro de sécurité sociale du patient ----------*/

  get_numSecuriteSociale(item): string {

    return item.numéroSécuritéSociale;


  }
  /*-------------Récupérer le sexe du patient ----------*/

  get_Sexe(item): string {
    const femme="F";
    const homme="H";
    if(item.sexe==1)
    {
      return femme;
    }else { return homme; }

  }

  /*-------------Récupérer le numéro d'étage de l'adresse  du patient ----------*/

  get_etage(item): string {
    const message="Pas d'étage";
   if(item.étage != "") {
     return item.étage;
   }
   else { return message; }


  }

  /*-------------Récupérer l'intervenant du patient qui y est présenté par l'item , sachant que je verifie tous les patients de chaque infirmier ----------*/

  getInfirmier(item) : string {
    let i : number=0;
    var message=" Ce patient n'a pas d'intervenant";
    let infirmier = this.patients.infirmiers;
    while(infirmier.length>i){
      let j : number=0;
      while (infirmier[i].patients.length > j ){
        if(infirmier[i].patients[j].prénom == item.prénom && infirmier[i].patients[j].nom == item.nom){
          return infirmier[i].prénom+" "+infirmier[i].nom ;
        }
        j++;
      }
      i++;
    }
    return message ;
  }



}



