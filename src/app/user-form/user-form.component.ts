import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  reactiveForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private userserviceService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  get forms(): { [key: string]: AbstractControl } {
    return this.reactiveForm.controls;
  }
  initForm() {
    this.reactiveForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      email: [undefined, Validators.required],
      mobileNumber: [undefined, Validators.required],
      password: [undefined, Validators.required],
      dob: [undefined, Validators.required],
      age:[undefined,Validators.required],
      contacts: new FormArray([])
    });
    this.initContacts();
    // this.addFullname();
  }
  initContacts() {
    (this.reactiveForm.get('contacts') as FormArray).push(
      this.formBuilder.group({
        mobileNumber: [undefined],
        email: [undefined],
        
      })
    );
  }


  
  get getContactForm(): FormArray {
    return this.reactiveForm.get('contacts') as FormArray;
  }

  onUserAdd(user: any) {
    this.submitted = true;
    if (this.reactiveForm.valid) {
      this.userserviceService.addUsers(user).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/home/user-table']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  removeContacts(i:number){
   (this.reactiveForm.get('contacts') as FormArray).removeAt(i) ;
  }
  resetForm() {
    this.reactiveForm.reset();
  }

  dateToAge() {
    var date = this.reactiveForm.value.dob;
    var year = new Date(date);
    var timeDiff = Math.abs(Date.now() - year.getTime());
    let age = Math.floor((timeDiff/(1000*3600*24*365)))
    this.reactiveForm.patchValue({age:age})
  }
}
