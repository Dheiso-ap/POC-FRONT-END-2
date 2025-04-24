import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from '../../models/card.interface';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogoConfirmarComponent } from '../../components/dialogo-confirmar/dialogo-confirmar.component';
import { MatButtonModule } from '@angular/material/button';
import { FormularioComponent } from "../../components/formulario/formulario.component";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    CardsComponent,
    MatDialogModule,
    MatButtonModule,
    DialogoConfirmarComponent, 
    MatMenuModule, 
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public dialog: MatDialog, private router: Router) {}

  selectedCard: Card | null = null;

  listaCardsFazer: Card[] = [
    {
      id: 1,
      titulo: 'Card 1',
      descricao: 'Descrição do Card 1',
      data: '01/01/2025'
    },
    {
      id: 2,
      titulo: 'Card 2',
      descricao: 'Descrição do Card 2',
      data: '02/01/2025'
    },
    {
      id: 3,
      titulo: 'Card 3',
      descricao: 'Descrição do Card 3',
      data: '03/01/2025'
    }
  ];

  listaCardsFazendo: Card[] = [
    {
      id: 4,
      titulo: 'Card 4',
      descricao: 'Descrição do Card 4',
      data: '03/01/2025'
    }
  ];

  listaCardsFeitos: Card[] = [];

  openForm(): void {
    this.openFormDialog(null);
  }

  logout(): void{
    this.router.navigate(['/login']);
  }

  editCard(card: Card): void {
    this.openFormDialog(card);
  }

  private openFormDialog(card: Card | null): void {
    const dialogRef: MatDialogRef<FormularioComponent, Card> = this.dialog.open(FormularioComponent, {
      width: '600px',
      position: {top:'0', left: '50%'},
      panelClass: 'alinha-centro',
      data: { card: card ? { ...card } : null },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: Card | undefined) => {
      if (result) {
        this.handleFormSubmit(result);
      }
    });
  }

  handleFormSubmit(cardData: Card): void {
    if (cardData.id) {
      this.atualizarCardNaLista(cardData);
    } else {
      const id = this.gerarNovoId();
      this.listaCardsFazer.unshift({ ...cardData, id: id });
    }
  }

  private atualizarCardNaLista(cardData: Card): void {
    const lists = [this.listaCardsFazer, this.listaCardsFazendo, this.listaCardsFeitos];

    for (const list of lists) {
      const index = list.findIndex(c => c.id === cardData.id);
      if (index !== -1) {
        list[index] = { ...cardData };
        break;
      }
    }
  }

  private gerarNovoId(): number {
    const allCards = [
      ...this.listaCardsFazer,
      ...this.listaCardsFazendo,
      ...this.listaCardsFeitos
    ];
    return Math.max(0, ...allCards.map(c => c.id || 0)) + 1;
  }

  openConfirmDialog(lista: Card[], index: number): void {
    const dialogRef = this.dialog.open(DialogoConfirmarComponent, {
      width: '300px',
      position: {top:'0', left: '50%'},
      panelClass: 'alinha-centro',
      data: { message: `Tem certeza que deseja excluir a tarefa?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteCard(lista, index);
      }
    });
  }

  onDeleteCard(lista: Card[], index: number) {
    lista.splice(index, 1);
  }

  onDrop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
