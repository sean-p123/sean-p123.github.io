import { Component } from '@angular/core';

@Component({
  selector: 'app-input-output-list',
  templateUrl: './input-output-list.component.html',
  styleUrls: ['./input-output-list.component.scss'],
  standalone: false
})
export class InputOutputListComponent {

  inputColumns = ['column1', 'column2', 'column3', 'column4'];
  outputColumns = ['column1', 'column2', 'column3', 'column4'];
}
