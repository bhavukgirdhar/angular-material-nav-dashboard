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


export interface Vat18Entry { 
    transactionNature?: string;
    tin?: string;
    purchaser?: string;
    state?: string;
    invoice?: string;
    invoiceDate?: Date;
    commodity?: string;
    quantity?: number;
    value?: number;
    vatRate?: number;
    freightValue?: number;
    transporterName?: string;
    transporterGRRR?: string;
    transporterGRRRDate?: Date;
    returnTransactionNature?: string;
}