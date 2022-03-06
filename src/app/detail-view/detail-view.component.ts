import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserResponseModel } from '../user-response-model.model';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  id:any;
  data:UserResponseModel= new UserResponseModel();

  constructor(
    private activatedRoute:ActivatedRoute,
    private location:Location,
    private userService:UserService
  ) { }

  getId(){
    this.activatedRoute.params.subscribe((params)=>(this.id=params['id']));
    
  }

  ngOnInit(): void {
    this.getId();
    this.userService.viewUsersById(this.id).subscribe((res)=>{
    console.log('param:',res);
    this.data=res;
    });
  }
}
