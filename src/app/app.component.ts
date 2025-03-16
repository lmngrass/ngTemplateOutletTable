import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { SortableDirective } from './dynamic-table/directives/sortable.directive';
import { SorticonComponent } from './dynamic-table/api/sorticon/sorticon.component';
import { ColumnConfig } from './dynamic-table/model.ts/model';
@Component({
  selector: 'app-root',
  imports: [DynamicTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DynamicTable';
  data: any[] = [
    {
      label: 'Invex',
      value: 1,
    },
    {
      label: 'KarC',
      value: 2,
    },
    {
      label: 'Hana',
      value: 3,
    },
    {
      label: 'Hana',
      value: 5,
    },
  ];
  columnConfig: ColumnConfig[] = [
    {
      field: 'label',
      headerName: 'MYLABEL',
      sortable: true,
      filterable: true,
    },
    {
      field: 'value',
      headerName: 'MYVALUE',
      sortable: true,
      filterable: true,
    },
  ];
  killMe() {
    console.log('killme handled');
  }
}
