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
import { IItem } from './iItem';
import { IUnit } from './iUnit';


export interface ProductionItemSummaryReportLine { 
    item?: IItem;
    quantity?: number;
    rate?: number;
    amount?: number;
    unit?: IUnit;
    numberOfDecimal?: number;
}
