import {Component, HostBinding, Input, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NavService } from 'src/app/services/nav.service';
import { NavItem } from 'src/app/models/NavItem';
import { MenuConstants } from 'src/app/configs/MenuConstants';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input()
    item!: NavItem;
  @Input() depth: number = 0;

  constructor(public navService: NavService,
              public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
         console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
         console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {

      let parentMenu = MenuConstants.MENUS.filter((parent) => {
          // find() will give -1, if no car was found that matched 
          //    car.make === 'BWM'
          return parent.children?.find((child) => child.displayName === item.displayName);
      });

      this.router.navigate([parentMenu[0].route + "/" + item.route]);
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}

