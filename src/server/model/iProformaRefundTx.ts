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
import { IAttributeGroupLine } from './iAttributeGroupLine';
import { IDeliveryOrderLine } from './iDeliveryOrderLine';
import { IDocument } from './iDocument';
import { IItemLine } from './iItemLine';
import { ILedger } from './iLedger';
import { ILedgerDetailLine } from './iLedgerDetailLine';
import { IOtherChargesLine } from './iOtherChargesLine';
import { IPaymentLine } from './iPaymentLine';
import { IStockDetailLine } from './iStockDetailLine';
import { ITaxableLine } from './iTaxableLine';
import { ReferenceTxInfo } from './referenceTxInfo';
import { ResourceProxy } from './resourceProxy';
import { TransactionInfo } from './transactionInfo';


export interface IProformaRefundTx { 
    stateName?: string;
    documents?: Array<IDocument>;
    billingGroupAttibuteGroupLine?: IAttributeGroupLine;
    transportDetailsForVoucherPrint?: string;
    contactId?: number;
    stateId?: number;
    salesManId?: number;
    sourceTx?: TransactionInfo;
    gstIn?: string;
    ewayBillNo?: string;
    transDocNo?: string;
    shipmentId?: string;
    challanNo?: string;
    dated?: Date;
    billAmount?: number;
    contactName?: string;
    noOfCreditDays?: number;
    salesManName?: string;
    itemLineTotal?: number;
    nonSchemeItemLines?: Array<IItemLine>;
    totalItemQuantity?: number;
    stockAutoDelivered?: boolean;
    vehicleNumber?: string;
    deliveryOrderLines?: Array<IDeliveryOrderLine>;
    paymentLines?: Array<IPaymentLine>;
    transporter?: string;
    shipmentDate?: Date;
    otherChargesLines?: Array<IOtherChargesLine>;
    stockDelivered?: boolean;
    otherChargesTotal?: number;
    transporterMobNo?: string;
    serviceLineTotal?: number;
    deliveryDate?: Date;
    rawMaterialLines?: Array<IItemLine>;
    termsOfDelivery?: string;
    supervisorId?: number;
    roundOffLedger?: ILedger;
    roundOffEnabled?: boolean;
    createStockLines?: boolean;
    buyersOrderNo?: string;
    receivedAmount?: number;
    roundAmount?: number;
    challanDated?: Date;
    deliveryAddress?: string;
    paymentDueDate?: Date;
    returnAmount?: number;
    stockGoingOut?: boolean;
    containerLines?: Array<IStockDetailLine>;
    supervisorName?: string;
    shippingAddress?: string;
    billingAddress3?: string;
    transporterId?: string;
    vehicleType?: string;
    transDistance?: number;
    ewayBillDate?: Date;
    transDocDate?: Date;
    shippingAddress2?: string;
    transportMode?: number;
    shippingAddress3?: string;
    deliveryAddress2?: string;
    billingAddress2?: string;
    billingAddress?: string;
    deliveryAddress3?: string;
    billingAddressCity?: string;
    modeOrTermsOfPayment?: string;
    billAmountCalculated?: number;
    descriptionForVoucherPrint?: string;
    shipmentDescription?: string;
    billingAddressState?: string;
    deliveryAddressState?: string;
    deliveryAddressCity?: string;
    autoStockDeliveryMode?: boolean;
    billAmountWithoutTax?: number;
    billingAddressPinCode?: string;
    deliveryAddressPinCode?: string;
    shippingAddressCity?: string;
    shippingAddressPinCode?: string;
    shippingAddressState?: string;
    ledger?: number;
    ledgerName?: string;
    printName?: string;
    ledgerDetailLines?: Array<ILedgerDetailLine>;
    paymentModeName?: string;
    paymentMode?: number;
    taxableLines?: Array<ITaxableLine>;
    billDiscountFixed?: number;
    billDiscountPerc?: number;
    billingGroupName?: string;
    billingGroup?: number;
    taxableLineTotal?: number;
    billingClassification?: number;
    billingClassificationName?: string;
    createLedgerDetailLines?: boolean;
    reverseChargeApplicable?: boolean;
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
    itemLines?: Array<IItemLine>;
}
