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
import { BarcodeTextInfo } from './barcodeTextInfo';


export interface BarcodePrintSettingInfo { 
    name?: string;
    topMargin?: number;
    leftMargin?: number;
    verticalGap?: number;
    horizontalGap?: number;
    stickerWidth?: number;
    stickerHeight?: number;
    stickersInRow?: number;
    rowsInSheet?: number;
    textInfos?: Array<BarcodeTextInfo>;
}