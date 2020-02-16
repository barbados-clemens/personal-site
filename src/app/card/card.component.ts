import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  @Input()
  cardInfo: CardInfo;
  constructor() { }

  ngOnInit(): void {
  }

}


export interface CardInfo {
  title: string;
  description: string;
  tags: string[];
  date: Date | string;
  route?: string;
}
