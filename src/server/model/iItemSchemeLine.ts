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


export interface IItemSchemeLine { 
    condition?: IItemSchemeLine.ConditionEnum;
    itemName?: string;
    itemId?: number;
    quantity?: number;
    validFrom?: Date;
    validTo?: Date;
    freeItemId?: number;
    freeItemName?: string;
    itemGroupName?: string;
    itemGroupId?: number;
    conditionAmount?: number;
    value?: number;
    type?: IItemSchemeLine.TypeEnum;
    position?: number;
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
export namespace IItemSchemeLine {
    export type ConditionEnum = 'NONE' | 'TOTAL_BILL_AMOUNT' | 'ITEM_GROUP_BILL_AMOUNT';
    export const ConditionEnum = {
        NONE: 'NONE' as ConditionEnum,
        TOTALBILLAMOUNT: 'TOTAL_BILL_AMOUNT' as ConditionEnum,
        ITEMGROUPBILLAMOUNT: 'ITEM_GROUP_BILL_AMOUNT' as ConditionEnum
    };
    export type TypeEnum = 'PRODUCT' | 'DISCOUNT' | 'DISCOUNT_AMOUNT';
    export const TypeEnum = {
        PRODUCT: 'PRODUCT' as TypeEnum,
        DISCOUNT: 'DISCOUNT' as TypeEnum,
        DISCOUNTAMOUNT: 'DISCOUNT_AMOUNT' as TypeEnum
    };
}