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


export interface ITaxLine { 
    amount?: number;
    tax?: number;
    taxName?: string;
    fixed?: boolean;
    taxOnTaxLines?: Array<ITaxLine>;
    primaryTaxLine?: boolean;
    taxOnTaxAmount?: number;
    value?: number;
    id?: number;
    jacksontype?: string;
}
