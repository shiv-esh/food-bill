import { Component, OnInit } from '@angular/core';
import { FoodItem } from './food-item-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {
  public foodItems: FoodItem[] = []
  public billItems: FoodItem[] = []
  public total:number=0

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getFoodItems();
   
  }

  getFoodItems() {
    this.http.get<FoodItem[]>("/api/fooditem").subscribe((response) => {
      this.foodItems = response;
      console.log(response)
    })
  }
  addItem(item: FoodItem) {
    var index =
      this.foodItems.indexOf(item)
    this.total=this.total+item.item_cost
    this.billItems.push(item);
    this.foodItems.splice(index, 1);
    console.log(this.billItems)
  }
  addRemovedItem(eventData:{fooditem:FoodItem}){
    this.foodItems.push(eventData.fooditem)
  }
  updateTotal(eventData:{newTotal:number}){
    this.total=eventData.newTotal;
    console.log(this.total)
  }

}
