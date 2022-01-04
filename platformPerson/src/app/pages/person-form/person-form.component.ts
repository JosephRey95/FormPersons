import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/Person';
import Swal from 'sweetalert2';
import { PersonsService } from '../../services/persons.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  person: Person = {
    I_CODE: 0,
    C_NAME: '',
    C_EMAIL: '',
    C_CITY: '',
    C_COMPANY: '',
    C_DESCRIPTION: '',
    F_DATE_CREATED: '',
  };
  edit: boolean = false;

  constructor(private personsService: PersonsService, private _router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.personsService.getPerson(params.id).subscribe(
        (data: any) => {
          this.person = data.data;
          this.edit = true;
        });
    }
  }

  updatePerson(){
    if(this.person.C_NAME == '' || this.person.C_EMAIL == '' || this.person.C_CITY == '' || this.person.C_COMPANY == '' || this.person.C_DESCRIPTION == ''){
      Swal.fire({
        icon: 'error',
        title: 'Empty Fields',
        confirmButtonColor: '#F85D5D',
        showConfirmButton: true
      })
    }else{
      delete this.person.F_DATE_CREATED;
      this.personsService.updatePerson(this.person.I_CODE, this.person).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: data.message,
            confirmButtonColor: '#F85D5D',
            showConfirmButton: true
          })
          this._router.navigate(['/person']);
        });
      }
  }


  savePerson(){
    if(this.person.C_NAME == '' || this.person.C_EMAIL == '' || this.person.C_CITY == '' || this.person.C_COMPANY == '' || this.person.C_DESCRIPTION == ''){
      Swal.fire({
        icon: 'error',
        title: 'Empty Fields',
        confirmButtonColor: '#F85D5D',
        showConfirmButton: true
      })
    }else{
      delete this.person.I_CODE;
      delete this.person.F_DATE_CREATED;
      this.personsService.savePerson(this.person).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: data.message,
            confirmButtonColor: '#F85D5D',
            showConfirmButton: true
          })
          this._router.navigate(['/person']);
        });
      }
  }

}
