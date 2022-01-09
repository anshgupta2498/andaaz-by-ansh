import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  category:string = ""
  all:boolean = false
  items:any[] = []
  noItemFound:boolean = false
  loading:boolean = true
  constructor(public route:ActivatedRoute, public itemService:ItemService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data=>{
      console.log(data);
      if(Object.keys(data).length == 0) this.exploreItems()
      else{
      this.category = data.category
      console.log(data.category)
      this.getItems();
    }
    })
  }
  getItems(){
    this.itemService.getCategorizedItems(this.category).subscribe(data=>{
      console.log(data)
      this.items = data.items
      this.loading = false
      if(this.items.length<1){
        console.log(this.items)
        this.noItemFound = true
      }
    })
  }
  exploreItems(){
    this.all = true
    this.itemService.exploreItems().subscribe(data=>{
      this.items = data.items
      this.loading = false
      if(this.items.length<1){
         console.log(this.items)
        this.noItemFound = true
      }
    })
  }
}
