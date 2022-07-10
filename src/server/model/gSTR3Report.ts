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
import { GSTR3ExportReport } from './gSTR3ExportReport';
import { GSTR3ImportReport } from './gSTR3ImportReport';
import { GSTR3InterPurchaseReport } from './gSTR3InterPurchaseReport';
import { GSTR3InterSaleCompReport } from './gSTR3InterSaleCompReport';
import { GSTR3InterSaleRegReport } from './gSTR3InterSaleRegReport';
import { GSTR3InterSaleSummaryReport } from './gSTR3InterSaleSummaryReport';
import { GSTR3InterSaleUnRegReport } from './gSTR3InterSaleUnRegReport';
import { GSTR3IntraPurchaseReport } from './gSTR3IntraPurchaseReport';
import { GSTR3IntraSaleRegReport } from './gSTR3IntraSaleRegReport';
import { GSTR3IntraSaleUnRegReport } from './gSTR3IntraSaleUnRegReport';
import { GSTR3NonTaxablePurchaseSummary } from './gSTR3NonTaxablePurchaseSummary';
import { GSTR3OtherITCReport } from './gSTR3OtherITCReport';


export interface GSTR3Report { 
    intraSaleRegReport?: GSTR3IntraSaleRegReport;
    intraSaleUnRegReport?: GSTR3IntraSaleUnRegReport;
    interSaleRegReport?: GSTR3InterSaleRegReport;
    interSaleUnRegReport?: GSTR3InterSaleUnRegReport;
    exportReport?: GSTR3ExportReport;
    interPurchaseReport?: GSTR3InterPurchaseReport;
    intraPurchaseReport?: GSTR3IntraPurchaseReport;
    importReport?: GSTR3ImportReport;
    nonTaxablePurcahseSummary?: GSTR3NonTaxablePurchaseSummary;
    outTaxableSupplyTaxableValue?: number;
    outTaxableSupplyIgst?: number;
    outTaxableSupplyCgst?: number;
    outTaxableSupplySgst?: number;
    outTaxableSupplyCess?: number;
    outNilRatedSupplyValue?: number;
    outZeroRatedSupplyValue?: number;
    outExpemtedSupplyValue?: number;
    outNonGSTSupplyValue?: number;
    interSaleSummaryReport?: GSTR3InterSaleSummaryReport;
    interSaleCompReport?: GSTR3InterSaleCompReport;
    otherItcReport?: GSTR3OtherITCReport;
}
