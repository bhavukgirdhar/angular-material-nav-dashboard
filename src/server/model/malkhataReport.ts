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
import { IMandi } from './iMandi';
import { MalkhataReportLine } from './malkhataReportLine';


export interface MalkhataReport { 
    mandi?: IMandi;
    dateFrom?: Date;
    dateTo?: Date;
    reportLine?: Array<MalkhataReportLine>;
}
