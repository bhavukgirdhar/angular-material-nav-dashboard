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


export interface IOtherCharges { 
    ledgerName?: string;
    ledgerId?: number;
    typeInt?: number;
    discount?: boolean;
    purchaseAccountLedgerId?: number;
    purchaseAccountLedgerName?: string;
    value?: number;
    type?: IOtherCharges.TypeEnum;
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
export namespace IOtherCharges {
    export type TypeEnum = 'FIXED' | 'PERCENT';
    export const TypeEnum = {
        FIXED: 'FIXED' as TypeEnum,
        PERCENT: 'PERCENT' as TypeEnum
    };
}
