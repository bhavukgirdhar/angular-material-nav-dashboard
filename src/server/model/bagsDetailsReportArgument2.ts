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
import { IGrainAgentItem } from './iGrainAgentItem';
import { ILedger } from './iLedger';
import { IMandi } from './iMandi';


export interface BagsDetailsReportArgument2 { 
    dateFrom?: Date;
    dateTo?: Date;
    ledger?: ILedger;
    mandi?: IMandi;
    item?: IGrainAgentItem;
}
