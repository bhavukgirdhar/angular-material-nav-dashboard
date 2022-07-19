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
import { TransactionInfo } from './transactionInfo';


export interface TaxWiseSaleRegisterReportLine { 
    voucherNo?: string;
    gstin?: string;
    gstinType?: string;
    transaction?: TransactionInfo;
    ledger?: string;
    txDate?: Date;
    roundAmount?: number;
    billAmount?: number;
    totalGstAmount?: number;
    cgst6?: number;
    sgst6?: number;
    cgstOnePointFive?: number;
    sgstOnePointFive?: number;
    cgst9?: number;
    sgst9?: number;
    cgst14?: number;
    sgst14?: number;
    cgstTwoPointFive?: number;
    sgstTwoPointFive?: number;
    cess?: number;
    amountGst5?: number;
    amountGst3?: number;
    igst5?: number;
    igst18?: number;
    igst28?: number;
    igst3?: number;
    igst12?: number;
    amountIgst12?: number;
    amountGst28?: number;
    amountIgst3?: number;
    amountGst18?: number;
    amountIgst5?: number;
    amountIgst28?: number;
    amountGst12?: number;
    amountIgst18?: number;
    amount?: number;
}