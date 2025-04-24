import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    // Simulação de autenticação - substitua por chamada real à API
    if (this.username === 'usuario' && this.password === 'senha') {
      // Login bem-sucedido - redirecionar para a página principal
      this.router.navigate(['/taskboard']);
    } else {
      this.errorMessage = 'Credenciais inválidas. Tente novamente.';
    }
  }
}