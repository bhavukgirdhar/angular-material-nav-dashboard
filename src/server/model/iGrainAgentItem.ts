/**
 * 
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { IAttributeGroupLine } from './iAttributeGroupLine';
import { IChildItemDetail } from './iChildItemDetail';
import { IDocument } from './iDocument';
import { IItemStockPrice } from './iItemStockPrice';
import { IOpeningStockTx } from './iOpeningStockTx';


export interface IGrainAgentItem { 
    gaushallaDonationOnQuantity?: boolean;
    bonusRate?: number;
    rdfRate?: number;
    packing?: number;
    pidfRate?: number;
    dressing?: number;
    commissionRate?: number;
    weightingRate?: number;
    unloadingRate?: number;
    stitchingRate?: number;
    marketFeeRate?: number;
    vyaparMandalRate?: number;
    loadingRate?: number;
    filtrationRate?: number;
    gaushallaDonationRate?: number;
    vyaparMandalOnQuantity?: boolean;
    disabled?: boolean;
    longDescription?: string;
    wholesalePriceDiscPercentage?: number;
    alternateUnitWholeSalePrice?: number;
    unitName?: string;
    rateCode?: string;
    itemImages?: Array<IDocument>;
    unitId?: number;
    hsnCode?: string;
    maxStock?: number;
    minStock?: number;
    mrp?: number;
    shelf?: string;
    serviceId?: number;
    manufacturerName?: string;
    itemgroupName?: string;
    sellingPrice?: number;
    alternateUnitId?: number;
    attributeGroupLine?: IAttributeGroupLine;
    openingStockTx?: IOpeningStockTx;
    batchEnabled?: boolean;
    manufacturerId?: number;
    packingType?: string;
    wholeSalePrice?: number;
    openingRate?: number;
    tradeItemGroupName?: string;
    itemgroupId?: number;
    tradeItemGroupId?: number;
    alternateUnitName?: string;
    productCode?: string;
    stockPriceList?: Array<IItemStockPrice>;
    maintainStock?: boolean;
    compatibleWith?: Array<string>;
    alternatePartNo?: Array<string>;
    gstIncPrice?: number;
    showItemOnHomePage?: boolean;
    usePrimaryRate?: boolean;
    openingStock?: number;
    purchasePrice?: number;
    dealerPrice?: number;
    landingPrice?: number;
    barCodeFile?: string;
    serviceName?: string;
    alternateUnitMrp?: number;
    masterItemId?: number;
    itemAttributeGroupId?: number;
    saleAccountLedgerName?: string;
    childItemDetailLines?: Array<IChildItemDetail>;
    purchaseAccountLedgerId?: number;
    enableBarcodePrinting?: boolean;
    consumeChildItemsInSale?: boolean;
    itemAttributeGroupName?: string;
    saleAccountLedgerId?: number;
    purchaseAccountLedgerName?: string;
    alternateUnitRetailPrice?: number;
    alternateUnitLandingPrice?: number;
    landingPriceDisPercentage?: number;
    sellingPriceDiscPercentage?: number;
    dealerPriceDiscPercentage?: number;
    alternateUnitSellingPrice?: number;
    alternateUnitPurchasePrice?: number;
    purchasePriceDisPercentage?: number;
    useMrpForRatesCalculation?: boolean;
    ledgerName?: string;
    ledgerId?: number;
    printName?: string;
    taxClassId?: number;
    taxClassName?: string;
    name?: string;
    description?: string;
    importedId?: number;
    logInfo?: string;
    productUserId?: number;
    creationdate?: Date;
    productUserName?: string;
    modificationdate?: Date;
    impCompanyGuid?: string;
    id?: number;
    jacksontype?: string;
}