import { NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ColumnConfig } from './model.ts/model';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-dynamic-table',
  imports: [NgTemplateOutlet, UpperCasePipe],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent implements OnInit, OnChanges {
  private _data: any[] = [];
  @Input({ required: true }) data!: any[];
  @Input({ required: true }) columns!: ColumnConfig[];
  @Input() selectionEnable: boolean = false;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;
  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  shouldFilterRowBeEnabled: boolean = false;
  processedData: any[] | undefined;
  filterValues: { [key: string]: string } = {}; // To hold filter values for each column
  private filterSubject: Subject<void> = new Subject(); // Subject for filter input
  selectedItems = new Set();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this._data = changes['data'].currentValue;
      this.processedData = [...this._data];
      console.log('data changed');
    }
    if (changes['columns'].currentValue) {
      this.shouldFilterRowBeEnabled = this.columns.some(
        (item) => item.filterable
      );
      console.log('shouldFilterRowBeEnabled', this.shouldFilterRowBeEnabled);
    }
  }
  ngOnInit(): void {
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.filterData();
    });
  }

  get tableData() {
    return this.processedData || [];
  }
  sort(field: string, direction: 'ASC' | 'DESC') {
    const compare = (a: any, b: any) => {
      if (a[field] < b[field]) {
        return direction === 'ASC' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === 'ASC' ? 1 : -1;
      }
      return 0;
    };
    this._data.sort(compare);
    // Check if there are any active filters
    if (Object.keys(this.filterValues).length > 0) {
      // Sort the processed data if filters are applied
      if (this.processedData) {
        this.processedData.sort(compare);
      }
    } else {
      this.processedData = [...this._data]; // Reset processed data to original
    }
  }
  clearFilter(field: string) {
    this.filterValues[field] = ''; // Remove the filter value for the specified column // Reset processed data to original
    this.filterSubject.next(); // Emit a value to trigger the filter
  }
  filterData() {
    this.processedData = this._data.filter((item) => {
      return this.columns.every((column) => {
        if (this.filterValues[column.field]) {
          return item[column.field]
            .toString()
            .toLowerCase()
            .includes(this.filterValues[column.field].toLowerCase());
        }
        return true; // If no filter is set for this column, include the item
      });
    });
  }
  onFilterChange(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterValues[field] = value;
    console.log('next filter');
    this.filterSubject.next(); // Emit a value to trigger the filter
  }
}
