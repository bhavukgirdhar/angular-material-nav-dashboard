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


export interface PInventoryOrderTxLine { 
    id?: number;
    item?: number;
    itemName?: string;
    quantity?: number;
    unitId?: number;
    unitName?: string;
    taxableAmountBeforeBillDiscount?: number;
    totalAmountBeforeBillDiscount?: number;
    rate?: number;
    disccountPerc?: number;
    standardRate?: number;
    taxGroupId?: number;
    taxGroupName?: string;
}
