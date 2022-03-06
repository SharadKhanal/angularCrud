import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
 
  userResponse:any=[];
  constructor(
    private router: Router, 
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.listAllUsers();
  }
  listAllUsers() {
    this.userService.listAllUsers().subscribe(
      (response: any) => {
        console.log(response);
        this.userResponse=response.users
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  delete(id:string) {
    this.userService.deleteData(id).subscribe(
      (response:any)=>{
        if(confirm("Are you sure to delete!")==true){
          console.log(response);
          this.listAllUsers();
        }
      },
      error=>{
        console.log(error);
      }
 
    )
   }
  

  onHome() {
    this['router'].navigate(['/home']);
  }

  onBack() {
    this.router.navigate(['/home']);
  }
  viewUser(id:number | undefined){
    this.router.navigate(['/home/detail-view',id]
    );
      
  }
  edit(id:string) {
    this.router.navigate(['home/edit',id]);
  }
  
}
