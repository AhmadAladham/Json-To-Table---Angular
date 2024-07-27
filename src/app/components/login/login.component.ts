import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, InputGroupModule, InputGroupAddonModule, CardModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  form : FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthenticationService, private router: Router, private toastr: ToastrService) {
      this.form = this.fb.group({
        email: ['',Validators.required],
        password: ['',Validators.required]
    });
    }
  
    ngOnInit(): void {
  }

  onLoginClick(){
    const val = this.form.value;

    if (val.email && val.password) {
        this.authService.login(val.email, val.password)
            .subscribe(
                (res) => {
                  if(res.token){
                    this.router.navigateByUrl('/json-to-table');
                  }
                  else{
                    this.toastr.warning('Invalid email or password');
                  }
                }
            );
    }
  }
}


