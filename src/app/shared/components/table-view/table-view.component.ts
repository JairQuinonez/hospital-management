import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

export interface ColumnDefinition {
  key: string;         
  header: string;      
  isDate?: boolean;     
  isCurrency?: boolean; 
}


@Component({
  selector: 'app-table-view',
  imports: [NgClass],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent<T extends Record<string, any>> { 
  data = input<T[]>([]); 
  columns = input<ColumnDefinition[]>([]);

  showActionButton = input<boolean>(false); 
  actionButtonText = input<string>('Acción'); 
  actionButtonClass  = input<string>('responsive-table__action-button--default') ;

   actionClicked =  output<T>(); 
   headerClicked =  output<string>(); 

  constructor() {}

  onHeaderClick(columnKey: string): void {
    
    this.headerClicked.emit(columnKey);
    console.log(`Header clicked: ${columnKey}`);
  }

  onActionButtonClick(rowData: T, event: MouseEvent): void {
    event.stopPropagation(); 
    this.actionClicked.emit(rowData);
  }


  trackByColumnKey(index: number, column: ColumnDefinition): string {
    return column.key;
  }

  trackByRowIndex(index: number, row: T): number {
    
    return index;
  }
}
