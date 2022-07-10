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
import { IPurchaseEnquiryLine } from './iPurchaseEnquiryLine';
import { ReferenceTxInfo } from './referenceTxInfo';
import { ResourceProxy } from './resourceProxy';


export interface IPurchaseEnquiryTx { 
    ledgerName?: string;
    ledgerId?: number;
    enquiryLines?: Array<IPurchaseEnquiryLine>;
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
}
