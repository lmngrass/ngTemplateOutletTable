import { Component, Host, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../dynamic-table.component';

@Component({
  selector: 'app-sorticon',
  templateUrl: './sorticon.component.html', // Ensure this path is correct
  styleUrls: ['./sorticon.component.scss'], // Corrected to styleUrls
})
export class SorticonComponent {
  sortOrder = 0;

  constructor(private dt: DynamicTableComponent) {}

  // ngOnInit(): void {
  //   this.sortOrder = this.dt.sortOrder;
  //   this.dt.sortChanged.subscribe(() => {
  //     this.sortOrder = this.dt.sortOrder;
  //   });
  // }

  // toggleSortOrder(): void {
  //   this.sortOrder = this.sortOrder === 1 ? -1 : 1;
  //   // You might want to call a method in DynamicTableComponent to sort the data
  //   this.dt.sortData(this.dt.sortField!); // Assuming sortField is accessible
  // }

  // get sortIcon(): string {
  //   return this.sortOrder === 1 ? '↑' : '↓'; // Example icons, replace with actual icons
  // }
}
