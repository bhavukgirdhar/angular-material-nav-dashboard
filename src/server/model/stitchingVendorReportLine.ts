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
import { IStitchingVendor } from './iStitchingVendor';
import { StitchingVendorReportDetailLine } from './stitchingVendorReportDetailLine';
import { TransactionInfo } from './transactionInfo';


export interface StitchingVendorReportLine { 
    voucherNumber?: string;
    vendor?: IStitchingVendor;
    totalAmount?: number;
    transactionDate?: Date;
    transaction?: TransactionInfo;
    vendorDetailLines?: Array<StitchingVendorReportDetailLine>;
}