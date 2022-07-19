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


export interface RepairRequestReportDetailLine { 
    repairItem?: string;
    dueDateItem?: Date;
    status?: RepairRequestReportDetailLine.StatusEnum;
    description?: string;
    srNo?: string;
    reference?: string;
    invoiceNo?: string;
    type?: RepairRequestReportDetailLine.TypeEnum;
    assignTo?: string;
    state?: string;
    repairRequestLineId?: number;
    smsMsg?: string;
    estimateAmount?: number;
    invoiceAmount?: number;
}
export namespace RepairRequestReportDetailLine {
    export type StatusEnum = 'Received' | 'With_Service_Center' | 'Received_From_Service_Center' | 'Delivered';
    export const StatusEnum = {
        Received: 'Received' as StatusEnum,
        WithServiceCenter: 'With_Service_Center' as StatusEnum,
        ReceivedFromServiceCenter: 'Received_From_Service_Center' as StatusEnum,
        Delivered: 'Delivered' as StatusEnum
    };
    export type TypeEnum = 'Repair' | 'Replace';
    export const TypeEnum = {
        Repair: 'Repair' as TypeEnum,
        Replace: 'Replace' as TypeEnum
    };
}