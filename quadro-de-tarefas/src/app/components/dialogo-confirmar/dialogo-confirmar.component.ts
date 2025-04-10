import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmar',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialogo-confirmar.component.html',
  styleUrl: './dialogo-confirmar.component.css'
})
export class DialogoConfirmarComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogoConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
