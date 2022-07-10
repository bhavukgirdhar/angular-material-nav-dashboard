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


export interface InventoryTxReportArgument { 
    dateFrom?: Date;
    dateTo?: Date;
    billingClassification?: number;
    billingGroup?: number;
    ledgerId?: number;
    showUsage?: boolean;
    showDetail?: boolean;
    txTypeClassName?: string;
    salesMan?: number;
    taxGroup?: number;
    itemGroup?: number;
    item?: number;
    manufacturer?: number;
    paymentMode?: number;
    user?: string;
    status?: string;
    subStatus?: string;
    salesSource?: number;
    flat?: boolean;
    salesCampaign?: number;
    reportType?: string;
    vehicleNo?: string;
    voucherConfigType?: string;
    otherChrages?: number;
}
