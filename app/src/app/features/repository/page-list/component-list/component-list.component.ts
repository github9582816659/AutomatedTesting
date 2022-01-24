import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
  components = [
    {id: 1, name: 'Username'},
    {id: 2, name: 'Password'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
