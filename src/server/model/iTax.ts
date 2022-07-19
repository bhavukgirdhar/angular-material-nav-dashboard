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


export interface ITax { 
    taxOnTax?: boolean;
    abbr?: string;
    fixed?: boolean;
    reverseChargeOutputAcId?: number;
    reverseChargeOutputAcName?: string;
    reverseChargeInputAcId?: number;
    reverseChargeInputAcName?: string;
    purchaseLedgerName?: string;
    saleLedgerName?: string;
    purchaseLedgerId?: number;
    saleLedgerId?: number;
    taxOnTaxList?: Array<ITax>;
    value?: number;
    label?: string;
    name?: string;
    description?: string;
    importedId?: number;
    logInfo?: string;
    productUserId?: number;
    creationdate?: Date;
    productUserName?: string;
    modificationdate?: Date;
    impCompanyGuid?: string;
    id?: number;
    jacksontype?: string;
}