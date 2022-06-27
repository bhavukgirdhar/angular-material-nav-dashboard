import { NavItem } from "../models/NavItem";

export class MenuConstants {

  public static MENUS: NavItem[] = [
    {
      displayName: 'Master',
      iconName: 'group',
      route: 'master',
      children: [
        {
          displayName: 'Items',
          iconName: '',
          route: 'master/allItems',
          children: [
            {
              displayName: 'All Item',
              iconName: '',
              route: 'master/allLedgers',
              children: []
            },
            {
              displayName: 'Add New Item',
              iconName: '',
              route: 'master/allLedgers',
              children: []
            }
          ]
        },
        {
          displayName: 'All Ledges',
          iconName: '',
          route: 'master/allLedgers',
          children: []
        },
        {
          displayName: 'Item Groups',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Other Charges',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Attribute',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Attribute Group',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Manufacturer',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Service',
          iconName: '',
          route: 'master/allLedgers',
          children: []
        },
        {
          displayName: 'Service Groups',
          iconName: '',
          route: '',
          children: []
        }
      ]
    },
    {
      displayName: 'Transaction',
      iconName: 'currency_rupee',
      route: 'transaction',
      children: [
        {
          displayName: 'Payment',
          iconName: '',
          route: 'transaction/payment',
          children: []
        },
        {
          displayName: 'Receipt',
          iconName: '',
          route: 'transaction/receipt',
          children: []
        },
        {
          displayName: 'Journal',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Sale',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Purchase',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Sale Order',
          iconName: '',
          route: '',
          children: []
        },
        {
          displayName: 'Quotation',
          iconName: '',
          route: '',
          children: []
        }
      ]
    },
    {
      displayName: 'Reports',
      iconName: 'currency_rupee',
      route: 'main/report',
      children: [
        {
          displayName: 'Cash in hand',
          iconName: '',
          route: 'cashInHand',
          children: []
        }
      ]
    }
  ];

}