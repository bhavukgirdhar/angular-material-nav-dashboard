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
import { MaterialRequestRegisterDetailLine } from './materialRequestRegisterDetailLine';
import { TransactionInfo } from './transactionInfo';


export interface MaterialRequestReportLine { 
    date?: Date;
    voucherNumber?: string;
    siteName?: string;
    contractorName?: string;
    materialRequestStatus?: string;
    status?: string;
    description?: string;
    transaction?: TransactionInfo;
    detailLines?: Array<MaterialRequestRegisterDetailLine>;
}
