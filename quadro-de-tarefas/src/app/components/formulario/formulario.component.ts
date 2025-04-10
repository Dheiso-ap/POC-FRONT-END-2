import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../../models/card.interface';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  @Input() card: Card | null = null;
  @Output() formSubmit = new EventEmitter<Card>();

  cardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      data: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.card) {
      // Converte a string para Date se necessário
      const dateValue = this.card.data ? new Date(this.card.data) : null;
      this.cardForm.patchValue({
        ...this.card,
        date: dateValue
      });
    }
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      const formValue = this.cardForm.value;
      // Se estiver editando, mantém o ID
      const cardData = this.card ? { ...formValue, id: this.card.id } : formValue;
      this.formSubmit.emit(cardData);
    }
  }

}
