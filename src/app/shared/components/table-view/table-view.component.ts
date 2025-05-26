import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

export interface ColumnDefinition {
  key: string;          // La clave del objeto de datos para esta columna
  header: string;       // El texto que se mostrará en el encabezado
  isDate?: boolean;     // Opcional: si es true, se podría aplicar un pipe de fecha (ejemplo futuro)
  isCurrency?: boolean; // Opcional: si es true, se podría aplicar un pipe de moneda (ejemplo futuro)
  // Puedes añadir más propiedades como 'width', 'textAlign', 'customCellRenderer', etc.
}


@Component({
  selector: 'app-table-view',
  imports: [NgClass],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent<T extends Record<string, any>> { // T es el tipo de objeto en el array de datos
  data = input<T[]>([]); // Los datos a mostrar
  columns = input<ColumnDefinition[]>([]); // Las columnas a mostrar

  showActionButton = input<boolean>(false); // Controla si se muestra la columna de acción
  actionButtonText = input<string>('Acción'); // Texto para el botón de acción
  actionButtonClass  = input<string>('responsive-table__action-button--default') ; // Clase por defecto para el botón

   actionClicked =  output<T>(); // Emite el objeto de la fila cuando se hace clic en el botón de acción
   headerClicked =  output<string>(); // Emite la 'key' de la columna al hacer clic en el header (para ordenar, etc.)

  constructor() {}

  onHeaderClick(columnKey: string): void {
    // Aquí podrías implementar lógica de ordenación si es necesario
    this.headerClicked.emit(columnKey);
    console.log(`Header clicked: ${columnKey}`);
  }

  onActionButtonClick(rowData: T, event: MouseEvent): void {
    event.stopPropagation(); // Evita que se propague el clic si la fila es clickeable
    this.actionClicked.emit(rowData);
  }

  // Para optimizar ngFor
  trackByColumnKey(index: number, column: ColumnDefinition): string {
    return column.key;
  }

  trackByRowIndex(index: number, row: T): number {
    // Si tus filas tienen un ID único, es mejor usarlo: return row.id;
    return index;
  }
}
