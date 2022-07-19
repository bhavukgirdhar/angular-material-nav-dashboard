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


export interface IUserGroup { 
    groupType?: IUserGroup.GroupTypeEnum;
    adminGroup?: boolean;
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
export namespace IUserGroup {
    export type GroupTypeEnum = 'ADMIN' | 'PARTNER' | 'CUSTOMER';
    export const GroupTypeEnum = {
        ADMIN: 'ADMIN' as GroupTypeEnum,
        PARTNER: 'PARTNER' as GroupTypeEnum,
        CUSTOMER: 'CUSTOMER' as GroupTypeEnum
    };
}