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


export interface TicketDetailLine2 { 
    dueDate?: Date;
    title?: string;
    description?: string;
    status?: string;
    transaction?: TransactionInfo;
    vchNo?: string;
    contactId?: number;
    contactName?: string;
    assignToName?: string;
    assignToId?: number;
    mobNo?: string;
    emailId?: string;
    isClosed?: boolean;
    trackerId?: number;
    trackerName?: string;
}
