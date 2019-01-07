
import { CabinetMedicalService } from './../cabinet-medical.service';
import { Component, OnInit } from '@angular/core';
import { CabinetInterface } from '../dataInterfaces/cabinet';
import {Adresse} from '../dataInterfaces/adresse';

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit {


  private _cms: CabinetInterface;
  public get cms(): CabinetInterface {
    return this._cms;
  }

  constructor(cabinetMedicalService: CabinetMedicalService) {

    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log(this.cms);
  }

  ngOnInit() {

  }
  /*-----------------------Récupérer le numéro de l'adresse de l'infirmier et du patient ------------------------ */

  getAdresse_numero(item): string {
    return item.numéro;
  }

  /*------------------------------Récupérer le nom et le prénom de l'infirmier et du patient ------------------------- */

  getNom_Prenom(item): string {
    return `${item.prénom} ${item.nom}`;
  }

  /*----------------------------------Récupérer la photo de l'infirmier ------------------------------------- */

  getPhoto(item): string {
    var chemin_photo = "data/";
    return `${chemin_photo + item.photo}`;

  }

  /*------------------------------------Récupérer l'id de l'infirmier ------------------------------------ */

  getId(item): string {
    return item.id;
  }

  /*--------------------------------Récupérer le numéro de securité sociale du patient ---------------------- */
  get_numSecuriteSociale(item): string {

    return item.numéroSécuritéSociale;


  }


/*----------------------Récupérer le numéro d'étage de l'adresse du patient et de l'infirmier -----------------*/
  get_etage(item): string {
    var message = "Pas d'étage";
    if (item.étage != "") {
      return item.étage;
    }
    else {
      return message;
    }

  }

  /*-----------------------------------------Récupérer le sexe du patient ----------------------------------------*/
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
