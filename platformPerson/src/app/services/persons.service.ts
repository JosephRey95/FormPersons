import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  public server: string = environment.url;
  public headers: any;
  
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  }

  getPersons(){
    return this.http.get(this.server+'/information');
  }

  getPerson(id: string){
    return this.http.get(this.server+'/information/'+id);
  }

  savePerson(person: Person){
    return this.http.post(this.server+'/information/',person);
  }

  deletePerson(id: string){
    return this.http.delete(this.server+'/information/'+id);
  }

  updatePerson(id: any, person: Person){
    console.log(id);
    console.log(person);
    return this.http.put(this.server+'/information/'+id,person);
  }

}
