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
import { ICostCenterLine } from './iCostCenterLine';
import { TransactionInfo } from './transactionInfo';


export interface ILedgerDetailLine { 
    transaction?: TransactionInfo;
    costCenterLines?: Array<ICostCenterLine>;
    debit?: number;
    ledgerName?: string;
    ledgerId?: number;
    credit?: number;
    chequeDate?: Date;
    qty?: number;
    bankDate?: Date;
    rate?: number;
    chequeNo?: string;
    taxRate?: number;
    referenceTx?: TransactionInfo;
    bankDescription?: string;
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
