export class UserResponseModel {
    id:number | undefined;
    name:string |undefined;
    mobileNumber:string |undefined;
    email:string | undefined;
    dob:string|undefined;
    password:string|undefined;
    contacts:Array<Contacts>=[];
    
}

export class Contacts{
mobileNumber:string|undefined;
email:string|undefined;
}
