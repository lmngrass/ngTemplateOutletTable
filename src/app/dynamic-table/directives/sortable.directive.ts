import { Directive, Input } from '@angular/core';
import { DynamicTableComponent } from '../dynamic-table.component';

@Directive({
  selector: '[appSortable]',
  host: {
    '(click)': 'handleClickEvent($event)',
  },
})
export class SortableDirective {
  @Input({ required: true }) field!: string;

  constructor(public dt: DynamicTableComponent) {
    console.log(this.dt);
  }
}
