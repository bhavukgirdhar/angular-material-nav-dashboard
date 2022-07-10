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
import { GSTR4APurchaseReportLine } from './gSTR4APurchaseReportLine';
import { GSTR4APurchaseRtnReportLine } from './gSTR4APurchaseRtnReportLine';
import { GSTR4ATxosReportLine } from './gSTR4ATxosReportLine';


export interface GSTR4AReport { 
    dateFrom?: Date;
    dateTo?: Date;
    compositionRate?: number;
    purchaseRegReportLines?: Array<GSTR4APurchaseReportLine>;
    purchaseImportServiceReportLines?: Array<GSTR4APurchaseReportLine>;
    purchaseUnRegReportLines?: Array<GSTR4APurchaseReportLine>;
    purchaseReturnRegReportLines?: Array<GSTR4APurchaseRtnReportLine>;
    purchaseReturnUnRegReportLines?: Array<GSTR4APurchaseRtnReportLine>;
    txosReportLines?: Array<GSTR4ATxosReportLine>;
}
