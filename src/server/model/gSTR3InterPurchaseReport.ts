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
import { GSTR3InterPurchaseReportLine } from './gSTR3InterPurchaseReportLine';


export interface GSTR3InterPurchaseReport { 
    itemLines?: Array<GSTR3InterPurchaseReportLine>;
    totalItemValue?: number;
    totalItemTaxableValue?: number;
    totalItemIgst?: number;
    totalItemCess?: number;
    serviceLines?: Array<GSTR3InterPurchaseReportLine>;
    totalServiceValue?: number;
    totalServiceTaxableValue?: number;
    totalServiceIgst?: number;
    totalServiceCess?: number;
}
