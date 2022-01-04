import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../../services/persons.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  listPerson: any = [];

  constructor(private personsService: PersonsService, private _router: Router) { }

  ngOnInit(): void {
    this.searchAll();
  }

  searchAll(){
    this.personsService.getPersons().subscribe(
      (data: any) => {
        this.listPerson = data.data;
      });
  }

  addPerson(){
    this._router.navigate(['/person/add']);
  }

  deleteRegister(codePerson: string){
    this.personsService.deletePerson(codePerson).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: data.message,
          confirmButtonColor: '#F85D5D',
          showConfirmButton: true
        })
        window.location.reload();
      });
  }

  updateRegister(codePerson: string){
    this._router.navigate(['person/edit/'+ codePerson]);
  }

}
