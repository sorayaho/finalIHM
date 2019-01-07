import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-patient-non-affecte',
  templateUrl: './patient-non-affecte.component.html',
  styleUrls: ['./patient-non-affecte.component.css']
})
export class PatientNonAffecteComponent implements OnInit {


  PatientForm: FormGroup;
  private _cms: CabinetInterface;
  NumSecuriteSocial:string;

  public get cms(): CabinetInterface {
    return this._cms;
  }

  constructor(public cabinetMedicalService: CabinetMedicalService, private formBuilder: FormBuilder,private router: Router,
              private route: ActivatedRoute) {
    this.initCabinet(cabinetMedicalService);

  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log(this._cms.patients);
  }

  ngOnInit() {
    this.NumSecuriteSocial=this.route.snapshot.params['numSecuriteSoc'];
    this.initForm();
  }


  initForm() {
    this.PatientForm = this.formBuilder.group({
      intervenant: ''
    });
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
    var femme="F";
    var homme="H";
    if(item.sexe==1)
    {
      return femme;
    }else { return homme; }

  }

  /*-------------Récupérer le numéro d'étage de l'adresse  du patient ----------*/

  get_etage(item): string {
    var message="Pas d'étage";
    if(item.étage != "") {
      return item.étage;
    }
    else { return message; }


  }


/**------------Cette méthode permet de vérifier si le patient n'est pas affecter à un infirmier pour afficher par la suite une liste de patient non affecté ------------*/

  Non_affecte(item){
    return this.cabinetMedicalService.Test_affectation(item);
  }




}
