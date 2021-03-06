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
import { ILedgerDetailLine } from './iLedgerDetailLine';
import { ReferenceTxInfo } from './referenceTxInfo';
import { ResourceProxy } from './resourceProxy';


export interface IBankTx { 
    amount?: number;
    expenses?: number;
    refNo?: string;
    draftOrChequeDate?: Date;
    draftOrChequeNo?: string;
    totalAmount?: number;
    type?: IBankTx.TypeEnum;
    totalDebit?: number;
    totalCredit?: number;
    voucherConfigType?: number;
    tdsRate?: number;
    tdsTypeId?: number;
    tdsTypeName?: string;
    generatedVchNumSeq?: number;
    vouchernumber?: string;
    tdsTypeWithPan?: boolean;
    voucherConfigTypeName?: string;
    transactionType?: number;
    storeName?: string;
    storeId?: number;
    termsId?: number;
    txStatus?: number;
    transactiondate?: Date;
    referenceNo?: string;
    otherReferences?: string;
    resourceProxy?: ResourceProxy;
    referenceTxInfoList?: Array<ReferenceTxInfo>;
    typeName?: string;
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
    ledgerDetailLines?: Array<ILedgerDetailLine>;
}
export namespace IBankTx {
    export type TypeEnum = 'CHEQUE_ISSUED' | 'DRAFT_ISSUED' | 'CHEQUE_DRAFT_RTGS_RECEIVED' | 'DEPOSIT_CASH_INTO_BANK' | 'WITHDRAW_CASH_FROM_BANK' | 'BANK_EXPENSES' | 'NEFT_RTGS_IMPS_TRANSFER';
    export const TypeEnum = {
        CHEQUEISSUED: 'CHEQUE_ISSUED' as TypeEnum,
        DRAFTISSUED: 'DRAFT_ISSUED' as TypeEnum,
        CHEQUEDRAFTRTGSRECEIVED: 'CHEQUE_DRAFT_RTGS_RECEIVED' as TypeEnum,
        DEPOSITCASHINTOBANK: 'DEPOSIT_CASH_INTO_BANK' as TypeEnum,
        WITHDRAWCASHFROMBANK: 'WITHDRAW_CASH_FROM_BANK' as TypeEnum,
        BANKEXPENSES: 'BANK_EXPENSES' as TypeEnum,
        NEFTRTGSIMPSTRANSFER: 'NEFT_RTGS_IMPS_TRANSFER' as TypeEnum
    };
}
