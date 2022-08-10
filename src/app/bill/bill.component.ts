import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodItem } from '../food-menu/food-item-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  public total:number=0;
@Input() billItems:FoodItem[]=[]
@Output() removeItem=new EventEmitter<{fooditem:FoodItem}>();
  constructor(private http: HttpClient,private route:Router) { }

  ngOnInit(): void {
    this.calculateTotal();
  }

  onRemoveItem(item:FoodItem){
    this.removeItem.emit({fooditem:item})
    var index =
      this.billItems.indexOf(item)
     
      this.billItems.splice(index, 1);
  }


  calculateTotal(){
    this.billItems.forEach(element => {
      
      this.total=this.total+element.item_cost;
    });
  }
 
}
