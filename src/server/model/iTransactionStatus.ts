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


export interface ITransactionStatus { 
    note?: string;
    txId?: number;
    status1?: number;
    status2?: number;
    status3?: number;
    status4?: number;
    dueDate?: Date;
    subStatus?: string;
    assignToId?: number;
    assignToName?: string;
    orderStatus?: string;
    closed?: boolean;
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
