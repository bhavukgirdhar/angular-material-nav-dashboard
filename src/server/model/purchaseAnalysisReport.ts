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
import { PurchaseAnalysisReportLine } from './purchaseAnalysisReportLine';


export interface PurchaseAnalysisReport { 
    graphType?: string;
    dateFrom?: Date;
    dateTo?: Date;
    totalAmount?: number;
    groupBy?: number;
    reportLines?: Array<PurchaseAnalysisReportLine>;
    interval?: string;
}
