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


export interface StockDetailedSummarryLine { 
    item?: IItem;
    openingStock?: number;
    qtyIn?: number;
    qtyOut?: number;
    unit?: IUnit;
    qtyNet?: number;
    productCode?: string;
}