import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  product: IProductCardInfo;

  constructor() {
  }

}


export interface IProductCardInfo {
  name: string;
  img: string;
  desc: string;
  tags?: string[];
  link?: string;
}
