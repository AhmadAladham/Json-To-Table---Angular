import { Injectable } from "@angular/core";
import {
  CanActivate,
} from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { TokenService } from "../services/token.service";

@Injectable({
  providedIn: "root",
})
export class AdminRoleGuard implements CanActivate {
    constructor(private tokenService: TokenService){}

  canActivate() {
    return this.isAdmin();
  }

  isAdmin() : boolean{
    let tokenPayload = this.tokenService.getTokenPayload();
    if(tokenPayload && tokenPayload.role === 'admin')
        return true;
    else return false;
  }
} 