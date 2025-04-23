import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../../models/card.interface';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  cardForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: Card | null }
  ) {
    this.isEditMode = !!data.card;

    this.cardForm = this.fb.group({
      titulo: [data.card?.titulo || '', [Validators.required, Validators.maxLength(50)]],
      descricao: [data.card?.descricao || '', [Validators.required, Validators.maxLength(200)]],
      data: [data.card?.data || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      const formValue = this.cardForm.value;
      const cardData = this.data.card
        ? { ...formValue, id: this.data.card.id }
        : formValue;

      this.dialogRef.close(cardData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
