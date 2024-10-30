import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login, ResLogin } from '../interfaces/login';
import { CocheraComponent } from '../cochera/cochera.component';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(DataAuthService)
  
  router = inject(Router);
    
    //programacin asincronica 
    
    //res es de la respuesta del fetch tipo respuesta, el await espera que se haga la tarea para hacer la otra
    
    errorLogin = false;    
    async login(loginFrom: NgForm){
      const{username,password} = loginFrom.value;
      const loginData = {username, password}

      const res = await this.authService.login(loginData)
      
      if(res?.statusText ==="OK") this.router.navigate(['/cochera']);
      else this.errorLogin = true;
    }
    
    ;
    showPassword: boolean = false; 

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  

}

