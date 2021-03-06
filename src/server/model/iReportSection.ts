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
import { IReportElement } from './iReportElement';


export interface IReportSection { 
    sectionId?: string;
    reportElements?: Array<IReportElement>;
    hiddenConditionArgument?: string;
    hiddenConditionType?: IReportSection.HiddenConditionTypeEnum;
}
export namespace IReportSection {
    export type HiddenConditionTypeEnum = 'EMPTY_DATA_SOURCE' | 'SHOW_ONLY_ON_LAST_LAGE' | 'EMPTY_DATA_SET';
    export const HiddenConditionTypeEnum = {
        EMPTYDATASOURCE: 'EMPTY_DATA_SOURCE' as HiddenConditionTypeEnum,
        SHOWONLYONLASTLAGE: 'SHOW_ONLY_ON_LAST_LAGE' as HiddenConditionTypeEnum,
        EMPTYDATASET: 'EMPTY_DATA_SET' as HiddenConditionTypeEnum
    };
}
