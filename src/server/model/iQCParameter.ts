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


export interface IQCParameter { 
    valueType?: IQCParameter.ValueTypeEnum;
    code?: string;
    paramType?: IQCParameter.ParamTypeEnum;
    uom?: string;
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
export namespace IQCParameter {
    export type ValueTypeEnum = 'RANGE' | 'FIXED';
    export const ValueTypeEnum = {
        RANGE: 'RANGE' as ValueTypeEnum,
        FIXED: 'FIXED' as ValueTypeEnum
    };
    export type ParamTypeEnum = 'INT' | 'DOUBLE' | 'BOOLEAN' | 'TEXT';
    export const ParamTypeEnum = {
        INT: 'INT' as ParamTypeEnum,
        DOUBLE: 'DOUBLE' as ParamTypeEnum,
        BOOLEAN: 'BOOLEAN' as ParamTypeEnum,
        TEXT: 'TEXT' as ParamTypeEnum
    };
}