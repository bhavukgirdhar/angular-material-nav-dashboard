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
import { IItemBatch } from './iItemBatch';
import { IStockLocation } from './iStockLocation';


export interface ItemTransactionRegisterReportArgument { 
    dateFrom?: Date;
    dateTo?: Date;
    item?: IItem;
    batch?: IItemBatch;
    location?: IStockLocation;
    transType?: string;
    totalLine?: Array<string>;
}