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


export interface ITask { 
    context?: string;
    note?: string;
    contactId?: number;
    dueDate?: Date;
    repeat?: ITask.RepeatEnum;
    interval?: number;
    assigneeId?: number;
    taskRepeat?: ITask.TaskRepeatEnum;
    ownerId?: number;
    ownerName?: string;
    internalReferenceName?: string;
    expectedReminderDate?: Date;
    internalReferenceId?: number;
    reminderValue?: number;
    reminderValueType?: ITask.ReminderValueTypeEnum;
    noOfRecurrence?: number;
    reminderBySms?: boolean;
    reminderByEmail?: boolean;
    assigneeName?: string;
    taskInterval?: number;
    systemNotes?: string;
    reminderEnabled?: boolean;
    priority?: ITask.PriorityEnum;
    title?: string;
    status?: ITask.StatusEnum;
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
export namespace ITask {
    export type RepeatEnum = 'Once' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
    export const RepeatEnum = {
        Once: 'Once' as RepeatEnum,
        Daily: 'Daily' as RepeatEnum,
        Weekly: 'Weekly' as RepeatEnum,
        Monthly: 'Monthly' as RepeatEnum,
        Yearly: 'Yearly' as RepeatEnum
    };
    export type TaskRepeatEnum = 'Once' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
    export const TaskRepeatEnum = {
        Once: 'Once' as TaskRepeatEnum,
        Daily: 'Daily' as TaskRepeatEnum,
        Weekly: 'Weekly' as TaskRepeatEnum,
        Monthly: 'Monthly' as TaskRepeatEnum,
        Yearly: 'Yearly' as TaskRepeatEnum
    };
    export type ReminderValueTypeEnum = 'Mins' | 'Hrs' | 'Days';
    export const ReminderValueTypeEnum = {
        Mins: 'Mins' as ReminderValueTypeEnum,
        Hrs: 'Hrs' as ReminderValueTypeEnum,
        Days: 'Days' as ReminderValueTypeEnum
    };
    export type PriorityEnum = 'Low' | 'Medium' | 'High';
    export const PriorityEnum = {
        Low: 'Low' as PriorityEnum,
        Medium: 'Medium' as PriorityEnum,
        High: 'High' as PriorityEnum
    };
    export type StatusEnum = 'New' | 'Completed';
    export const StatusEnum = {
        New: 'New' as StatusEnum,
        Completed: 'Completed' as StatusEnum
    };
}
