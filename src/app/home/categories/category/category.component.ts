import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category:Category
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  showCategory(){
    this.router.navigate(['/product-list'], {queryParams:{category:this.category.name}});
  }
}
