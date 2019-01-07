import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-affecter-patient',
  templateUrl: './affecter-patient.component.html',
  styleUrls: ['./affecter-patient.component.css']
})
export class AffecterPatientComponent implements OnInit {

  PatientForm: FormGroup;
  private _cms: CabinetInterface;
  ErrorMessage: string;
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
    console.log(this.patients);
  }

  public get patients(): CabinetInterface {
    return this._cms;
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



  getNom_Prenom(item): string {
    return `${item.prénom} ${item.nom}`;
  }

  getAdresse_numero(item): string {
    var message="Pas de numéro";
    if(item.numéro != "") {
      return item.numéro;
    }
    else { return message; }

  }
/*
  get_numSecuriteSociale(item): string {

    return item.numéroSécuritéSociale;


  }*/

  get_Sexe(item): string {
    var femme="F";
    var homme="H";
    if(item.sexe==1)
    {
      return femme;
    }else { return homme; }

  }

  get_etage(item): string {
    var message="Pas d'étage";
    if(item.étage != "") {
      return item.étage;
    }
    else { return message; }


  }




  /*-------------------------------méthodes permetent de recuperer les infos du patient ou infirmier comme le nom ...----*/
  getNomPatien(item){// recuperer le nom et le prenom
    return item.nom +" "+item.prénom;
  }

  // verifier si le patient n est pas affecter a une infirrmiere , cette methode est utiliseés dans le templatate pour afficher ou pas le input d'affectation

  Non_affecte(item){
    return this.cabinetMedicalService.Test_affectation(item);
  }

  AffecterPatient(){
    const formValue = this.PatientForm.value;// recuperer les infos du formulaires(la valeur de chaque  champs remplis)
     let NumSécuritéSocial:string =this.route.snapshot.params['numSecuriteSoc'];
    let infirmier : string  = formValue['intervenant'];

    console.log(infirmier);
    this.cabinetMedicalService.affecter(NumSécuritéSocial,infirmier).then(
      ()=>{
        this.router.navigate(['/patient']);
      },
      (Erreur)=>{
        this.ErrorMessage=Erreur;
      }
    );
    }







}
