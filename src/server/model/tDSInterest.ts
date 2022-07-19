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
import { ILedger } from './iLedger';
import { TDSInterestReportLine } from './tDSInterestReportLine';


export interface TDSInterest { 
    ledger?: ILedger;
    tdsRate?: number;
    minimumAmountForTds?: number;
    dateFrom?: Date;
    dateTo?: Date;
    totalInterest?: number;
    totalTdsAmount?: number;
    reportLine?: Array<TDSInterestReportLine>;
}