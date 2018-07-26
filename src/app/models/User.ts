export interface Roles {
    reader: boolean;
    author?: boolean;
    admin?:  boolean;
  }
  
  export class User {
    email:    string;
    imgURL: string;
    roles:    Roles;
  
    constructor(authData) {
      this.email    = authData.email
      this.imgURL = authData.imgURL
      this.roles    = { reader: true }
    }
  }