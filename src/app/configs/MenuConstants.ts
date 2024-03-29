import { NavItem } from "../models/NavItem";

export class MenuConstants {

  public static MENUS: NavItem[] = [
    {
      displayName: 'Master',
      iconName: 'group',
      route: 'main/master',
      children: [
        {

          displayName: 'All Item',
          iconName: '',
          route: 'allItems',
          children: []

        },
        {
          displayName: 'Item Groups',
          iconName: '',
          route: 'allItemGroups',
          children: []
        },
        {
          displayName: 'Attribute',
          iconName: '',
          route: 'allAttributes',
          children: []
        },
        {
          displayName: 'Attribute Group',
          iconName: '',
          route: 'allAttributeGroups',
          children: []
        },
        {
          displayName: 'All Ledges',
          iconName: '',
          route: 'master/allLedgers',
          children: []
        },       
        {
          displayName: 'Other Charges',
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
      route: 'main/transaction',
      children: [
        {
          displayName: 'Payment',
          iconName: '',
          route: 'newVoucher/Payment',
          children: []
        },
        {
          displayName: 'Receipt',
          iconName: '',
          route: 'newVoucher/Receipt',
          children: []
        },
        {
          displayName: 'Journal',
          iconName: '',
          route: 'journal',
          children: []
        },
        {
          displayName: 'Sale',
          iconName: '',
          route: 'newOrder/sale',
          children: []
        },
        {
          displayName: 'Purchase',
          iconName: '',
          route: 'newOrder/purchase',
          children: []
        },
        {
          displayName: 'Sale Order',
          iconName: '',
          route: 'newOrder/saleOrder',
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
        },
        {
          displayName: 'Overstock Report',
          iconName: '',
          route: 'overStockReport',
          children: []
        },
        {
          displayName: 'Day Book',
          iconName: '',
          route: 'dayBook',
          children: []
        },
        {
          displayName: 'Ledger Book',
          iconName: '',
          route: 'ledgerBook',
          children: []
        },
        {
          displayName: 'Balance Sheet',
          iconName: '',
          route: 'balanceSheet',
          children: []
        },
        {
          displayName: 'Sale Register',
          iconName: '',
          route: 'saleRegister',
          children: []
        },
        {
          displayName: 'Purchase Register',
          iconName: '',
          route: 'purchaseRegister',
          children: []
        },
        {
          displayName: 'Item Register',
          iconName: '',
          route: 'itemRegister',
          children: []
        }
      ]
    }
  ];

}
