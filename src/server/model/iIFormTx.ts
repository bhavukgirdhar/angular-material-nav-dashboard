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
import { IIFormItemLine } from './iIFormItemLine';
import { ILedgerDetailLine } from './iLedgerDetailLine';
import { IStockDetailLine } from './iStockDetailLine';
import { ReferenceTxInfo } from './referenceTxInfo';
import { ResourceProxy } from './resourceProxy';


export interface IIFormTx { 
    itemLines?: Array<IIFormItemLine>;
    ledgerName?: string;
    ledgerId?: number;
    mandiId?: number;
    mandiName?: string;
    ijformFlag?: boolean;
    totalTotal?: number;
    totalPIDF?: number;
    totalRDF?: number;
    ledgerDetailLines?: Array<ILedgerDetailLine>;
    itemLineTotal?: number;
    totalGrossAmount?: number;
    totalGaushalla?: number;
    totalLoading?: number;
    totalMarket?: number;
    totalBonous?: number;
    totalWeighting?: number;
    newIJformFlag?: boolean;
    totalStitching?: number;
    totalVyaparMadal?: number;
    totalCommission?: number;
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
    stockDetailLines?: Array<IStockDetailLine>;
}
