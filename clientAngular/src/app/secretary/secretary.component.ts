
import { CabinetMedicalService } from './../cabinet-medical.service';
import { Component, OnInit } from '@angular/core';
import { CabinetInterface } from '../dataInterfaces/cabinet';


@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {


  private _cms: CabinetInterface;
  public get cms(): CabinetInterface {
    return this._cms;
  }

  constructor(public cabinetMedicalService: CabinetMedicalService) {

    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log(this.cms);
  }

  ngOnInit() {

  }

/*------------Récupérer le nom du cabinet ------------*/
  getNom_Cabinet(item): string {
    return item.nom;
  }

  /*------------Récupérer le numéro de l'adresse du cabinet ------------*/
 getAdresse_numero(item): string {
    return item.numéro;
  }
}



