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


export interface RepairRequestReportArgument3 { 
    dateFrom?: Date;
    dateTo?: Date;
    dueDate?: Date;
    contactId?: number;
    serviceCenterLedger?: number;
    repairItem?: string;
    status?: RepairRequestReportArgument3.StatusEnum;
    engineerId?: number;
    state?: string;
    srNo?: string;
}
export namespace RepairRequestReportArgument3 {
    export type StatusEnum = 'Received' | 'With_Service_Center' | 'Received_From_Service_Center' | 'Delivered';
    export const StatusEnum = {
        Received: 'Received' as StatusEnum,
        WithServiceCenter: 'With_Service_Center' as StatusEnum,
        ReceivedFromServiceCenter: 'Received_From_Service_Center' as StatusEnum,
        Delivered: 'Delivered' as StatusEnum
    };
}