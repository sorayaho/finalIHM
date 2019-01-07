

import { Adresse } from './dataInterfaces/adresse';
import { InfirmierInterface } from './dataInterfaces/infirmier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabinetInterface } from './dataInterfaces/cabinet';
import { PatientInterface } from './dataInterfaces/patient';
import { sexeEnum } from './dataInterfaces/sexe';

@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {

  private _cabinet: CabinetInterface;

  private _http: HttpClient;
  public get http(): HttpClient {
    return this._http;
  }

  constructor(http: HttpClient) {
    this._http = http;
  }

  async getData(url: string): Promise<CabinetInterface> {

    //get HTTP response as text
    const response = await this.http.get(url, {responseType: 'text'}).toPromise();

    //parse the response with DOMParser
    let parser = new DOMParser();
    let doc = parser.parseFromString(response, "application/xml");

    //if no doc, exit
    if (!doc) return null;

    //default cabinet
    const cabinet: CabinetInterface = {
      infirmiers: [],
      patientsNonAffectes: [],
      adresse: this.getAdressFrom(doc.querySelector("cabinet")),
      patients: []
    };

    // 1 - tableau des infirmiers
    const infirmiersXML =  Array.from( doc.querySelectorAll( "infirmiers > infirmier" ) ); //transformer la NodeList en tableau pour le map

    cabinet.infirmiers = infirmiersXML.map( I => ({
      id      : I.getAttribute("id"),
      prénom  : I.querySelector("prénom").textContent,
      nom     : I.querySelector("nom"   ).textContent,
      photo   : I.querySelector("photo" ).textContent,
      adresse : this.getAdressFrom(I),
      patients: []
    }) );
    const patients1XML =  Array.from( doc.querySelectorAll( "patients > patient" ) ); //transformer la NodeList en tableau pour le map

    cabinet.patients = patients1XML.map( I => ({
      prénom  : I.querySelector("prénom").textContent,
      nom     : I.querySelector("nom"   ).textContent,
      sexe: I.querySelector("sexe").textContent === "M" ? sexeEnum.M : sexeEnum.F,
      numéroSécuritéSociale: I.querySelector("numéro").textContent,
      adresse: this.getAdressFrom( I ),
      visiteDate: I.querySelector( "visite[date]" ).getAttribute("date")
    }) );

    // 2 tableau des patients
    const patientsXML  = Array.from( doc.querySelectorAll( "patients > patient" ) );
    const patients: PatientInterface[] = patientsXML.map( P => ({
      prénom: P.querySelector("prénom").textContent,
      nom: P.querySelector("nom").textContent,
      sexe: P.querySelector("sexe").textContent === "M" ? sexeEnum.M : sexeEnum.F,
      numéroSécuritéSociale: P.querySelector("numéro").textContent,
      adresse: this.getAdressFrom( P )
    }) );

    // 3 Tableau des affectations à faire.
    const affectations = patients1XML.map( (P, i) => {
      const visiteXML = P.querySelector( "visite[intervenant]" );
      let infirmier: InfirmierInterface = null;
      if (visiteXML !== null) {
        infirmier = cabinet.infirmiers.find( I => I.id === visiteXML.getAttribute("intervenant") );
      }
      return {patient: cabinet.patients[i], infirmier: infirmier};
    } );

    // 4 Réaliser les affectations
    affectations.forEach( ({patient: P, infirmier: I}) => {
      if (I !== null) {
        I.patients.push( P );
      } else {
        cabinet.patientsNonAffectes.push( P );
      }
    });

    // Return the cabinet
    this._cabinet = cabinet;
    return cabinet;


  }

/*---------------------------------Récupérer l'adresse-------------------------------------*/

  private getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville: (node = root.querySelector("adresse > ville")) ? node.textContent : "",
      codePostal: (node = root.querySelector("adresse > codePostal")) ? parseInt(node.textContent, 10) : 0,
      rue: (node = root.querySelector("adresse > rue")) ? node.textContent : "",
      numéro: (node = root.querySelector("adresse > numéro")) ? node.textContent : "",
      étage: (node = root.querySelector("adresse > étage")) ? node.textContent : "",
    };
  }

  /*----------------------------L'ajout d'un nouveau patient ----------------------------------*/

  public ajouter(patient: PatientInterface, date_naissance:string) {
    this.http.post('/addPatient', {
      patientName: patient.nom,
      patientForname: patient.prénom,
      patientNumber: patient.numéroSécuritéSociale,
      patientSex: patient.sexe,
      patientBirthday:date_naissance,
      patientFloor: patient.adresse.étage,
      patientStreetNumber: patient.adresse.numéro,
      patientStreet: patient.adresse.rue,
      patientPostalCode: patient.adresse.codePostal,
      patientCity: patient.adresse.ville
    }).toPromise().then(
      err => console.error(err)
    );

  }

  /*-----------------------La vérification de l'existance d'un patient dans le tableau patients suivant son nom,prénom et son numéro de sécurité sociale ----------------*/

  existence_patient(patient:PatientInterface): boolean {

    let i: number = 0;
    let numSécuSoc : string =""+patient.numéroSécuritéSociale;
    let Nom : string =""+patient.nom;
    let Prenom : string=""+patient.prénom;

    while( i< this._cabinet.patients.length){

      if (this._cabinet.patients[i].nom === Nom && this._cabinet.patients[i].prénom === Prenom )
      {
        console.log(this._cabinet.patients[i].numéroSécuritéSociale);
        console.log(Nom);
        console.log(Prenom);
        return false;
      }

      if (this._cabinet.patients[i].numéroSécuritéSociale === numSécuSoc)
      {
        return false;
      }

      i++;
    }

    return true;
  }

/*------------------Récupérer un patient suivant son numéro de sécurité sociale --------------*/

  getPatientBy_NumSécuritéSocial(num : string)
  {

    const Patient = this._cabinet.patients.find(

      (patientObject)=>{

        return patientObject.numéroSécuritéSociale === num;
      }
    );
    return Patient;
  }

  /*-------------------Tester si le patient est non affecté si c'était le cas on renvoie true ----------------*/

  Test_affectation(item) : boolean{
    let i : number = 0;

    while (this._cabinet.patientsNonAffectes.length >i){
      if(this._cabinet.patientsNonAffectes[i].nom == item.nom && this._cabinet.patientsNonAffectes[i].prénom == item.prénom){
        return true;
      }
      i++;
    }
    return false;
  }

/*----------------------------------------Affecter un patient à un infirmier -----------------------------------------*/
  public affecter(numSec : string ,infirmier :string ) {
    let infirmierId: string = ''+infirmier;
    const patient = this._cabinet.patients.find(
      (s) => {
        return s.numéroSécuritéSociale === numSec;
      }
    );
    return new Promise(
      (resolve,reject)=> {
        this._http.post('/affectation', {
          infirmier: infirmierId,
          patient: patient.numéroSécuritéSociale
        }).toPromise().then(
          () => {
            resolve();
          },
          err => {
            reject(err);
          }
        );
      }
    );
  }

}



