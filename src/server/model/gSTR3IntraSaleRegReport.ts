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
import { GSTR3IntraSaleRegReportLine } from './gSTR3IntraSaleRegReportLine';


export interface GSTR3IntraSaleRegReport { 
    itemLines?: Array<GSTR3IntraSaleRegReportLine>;
    totalItemValue?: number;
    totalItemCgst?: number;
    totalItemSgst?: number;
    totalItemCess?: number;
    serviceLines?: Array<GSTR3IntraSaleRegReportLine>;
    totalServiceValue?: number;
    totalServiceCgst?: number;
    totalServiceSgst?: number;
    totalServiceCess?: number;
}