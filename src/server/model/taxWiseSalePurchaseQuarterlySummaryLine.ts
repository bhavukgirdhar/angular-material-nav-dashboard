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
import { TaxWiseSalePurchaseQuarterlySummaryLineDetail } from './taxWiseSalePurchaseQuarterlySummaryLineDetail';


export interface TaxWiseSalePurchaseQuarterlySummaryLine { 
    billingClassification?: string;
    totalSale?: number;
    totalSaleReturn?: number;
    netSale?: number;
    totalPurchase?: number;
    totalPurchaseReturn?: number;
    netPurchase?: number;
    detailLine?: Array<TaxWiseSalePurchaseQuarterlySummaryLineDetail>;
}