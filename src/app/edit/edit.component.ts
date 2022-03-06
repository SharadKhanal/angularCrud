import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserResponseModel } from '../user-response-model.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  reactiveForm: FormGroup = new FormGroup({});
data: UserResponseModel = new UserResponseModel();

  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  getId() {
    this.activatedRoute.params.subscribe((param) => {this.id = param['id'],
    this.getdata()
    });
  }

  ngOnInit(): void {
    this.getId();
    this.userService.viewUsersById(this.id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.reactiveForm.patchValue(this.data);
    });
    this.initForm();
    this.initContact();
  }

  initForm() {
    this.reactiveForm = this.formBuilder.group({
      name: this.data.name,
      email: this.data.email,
      password: this.data.password,
      mobileNumber: this.data.mobileNumber,
      contacts: new FormArray([])
     
    });
    
  }

  initContact(){
    (this.reactiveForm.get('contacts') as FormArray).push(
      this.formBuilder.group({
        mobileNumber:[undefined],
        email:[undefined]
      })
    )
  }
  get getContactForm():FormArray{
    return this.reactiveForm.get('contacts') as FormArray;
  }

  getdata(){
    this.userService.viewUsersById(this.id).subscribe((user:any)=>{
      this.setData(user);
    })
  }

  setData(user:UserResponseModel){
    this.reactiveForm.patchValue({
      name:user.name,
      email:user.email,
      password:user.password,
      mobileNumber:user.mobileNumber
    });



    if (user.contacts.length == 0) {
      return;
    }

    user?.contacts?.map((value) => {
      (this.reactiveForm.get('contacts') as FormArray).push(
        this.formBuilder.group({
          mobileNumber: value?.mobileNumber,
          email: value?.email
         
        })
      );
    });
  }


  onEditUser(data: UserResponseModel) {
    this.userService.updateUsers(this.id, data).subscribe(
      (response: any) => {
        console.log(response);
        this.reactiveForm.reset();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
