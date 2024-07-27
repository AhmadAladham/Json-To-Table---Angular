import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-json-to-table',
  standalone: true,
  imports: [InputTextareaModule, CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './json-to-table.component.html',
  styleUrl: './json-to-table.component.css'
})

export class JsonToTableComponent implements OnInit {
  @ViewChild('grid') grid!: Table;

  private jsonInputSubject = new Subject<string>();
  private readonly debounceTimeMs = 800; //time (in ms) to wait after the user stops typing to start parsing json into the table

  jsonInput: string = '';
  jsonProperties: string[] = [];
  jsonArray: any[] = [];
  filters: any = {};
  filteredJson: any[] = [];
  isValidJson: boolean = false;
  validationError : string = '';

  ngOnInit(): void {
    this.jsonInputSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe(() => {
      this.parseJson();
    });
  }

  parseJson(): void {
    console.log('i was called');
    try {
      this.jsonArray = JSON.parse(this.jsonInput);
      
      if (Array.isArray(this.jsonArray) && this.jsonArray.length > 0) {
        const propertiesSet = new Set<string>();
        this.jsonArray.forEach(item => {
          Object.keys(item).forEach(prop => propertiesSet.add(prop));
        });

        this.jsonProperties = Array.from(propertiesSet);
        this.filteredJson = [...this.jsonArray];
        this.validationError = '';
      } else {
        this.validationError = 'Please enter a non-empty JSON array';
        this.jsonProperties = [];
        this.filteredJson = [];
      }
    } catch (error) {
      this.validationError = 'Please enter a valid JSON array';
      this.jsonProperties = [];
      this.jsonArray = [];
      this.filteredJson = [];
    }
  }

  onJsonInputChange(){
    this.jsonInputSubject.next(this.jsonInput);
  }

  onSearchClick(){
    this.applyFilters();
    this.grid.first = 0;
  }

  onClearSearchClick(){
    this.filters = {};
  }

  applyFilters(): void {
    this.filteredJson = this.jsonArray.filter(item => {
      return this.jsonProperties.every(prop => {
        const filterValue = this.filters[prop];
        const itemValue = item[prop];

        if (filterValue) {
          if (typeof itemValue === 'string') {
            return itemValue.toLowerCase().includes(filterValue.toString().toLowerCase());
          } else if (typeof itemValue === 'number') {
            return itemValue === Number(filterValue);
          }
          else return false;
        }
        return true;
      });
    });
  }

  ngOnDestroy() {
    this.jsonInputSubject.complete();
  }
}
