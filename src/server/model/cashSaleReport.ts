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
import { CashSaleReportLine } from './cashSaleReportLine';


export interface CashSaleReport { 
    dateFrom?: Date;
    dateTo?: Date;
    billAmount?: number;
    reportLines?: Array<CashSaleReportLine>;
    productUser?: string;
}