import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from '../../models/card.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogoConfirmarComponent } from '../../components/dialogo-confirmar/dialogo-confirmar.component';
import { MatButtonModule } from '@angular/material/button';
import { FormularioComponent } from "../../components/formulario/formulario.component";

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
    FormularioComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public dialog: MatDialog) {}

  showForm = false;
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
    this.selectedCard = null;
    this.showForm = true;
  }

  editCard(card: Card): void {
    debugger;
    this.selectedCard = { ...card };
    this.showForm = true;
  }

  handleFormSubmit(cardData: Card): void {
    if (cardData.id) {
      // Atualizar card existente em qualquer lista
      this.updateCardInLists(cardData);
    } else {
      // Adicionar novo card na primeira lista (listaCardsFazer)
      const newId = this.generateNewId();
      this.listaCardsFazer.unshift({ ...cardData, id: newId });
    }
    
    this.showForm = false;
    this.selectedCard = null;
  }

  private updateCardInLists(cardData: Card): void {
    // Procura o card em todas as listas e atualiza onde encontrar
    const lists = [this.listaCardsFazer, this.listaCardsFazendo, this.listaCardsFeitos];
    
    for (const list of lists) {
      const index = list.findIndex(c => c.id === cardData.id);
      if (index !== -1) {
        list[index] = { ...cardData };
        break;
      }
    }
  }

  private generateNewId(): number {
    // Obtém todos os cards de todas as listas
    const allCards = [
      ...this.listaCardsFazer,
      ...this.listaCardsFazendo,
      ...this.listaCardsFeitos
    ];
    // Gera um novo ID baseado no maior ID existente + 1
    return Math.max(0, ...allCards.map(c => c.id || 0)) + 1;
  }

  openConfirmDialog(lista: Card[], index: number): void {
    const dialogRef = this.dialog.open(DialogoConfirmarComponent, {
      width: '300px',
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