"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* (C) Stefan John / Stenway / Stenway.com / 2023 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmlFile = void 0;
const reliabletxt_1 = require("@stenway/reliabletxt");
const reliabletxt_io_1 = require("@stenway/reliabletxt-io");
const oml_1 = require("@stenway/oml");
// ----------------------------------------------------------------------
class OmlFile {
    static loadSync(filePath, reviver = null) {
        const reliableTxtDocument = reliabletxt_io_1.ReliableTxtFile.loadSync(filePath);
        return oml_1.OmlDocument.parse(reliableTxtDocument.text, reviver, reliableTxtDocument.encoding);
    }
    static load(filePath, reviver = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const reliableTxtDocument = yield reliabletxt_io_1.ReliableTxtFile.load(filePath);
            return oml_1.OmlDocument.parse(reliableTxtDocument.text, reviver, reliableTxtDocument.encoding);
        });
    }
    static saveSync(document, filePath, formatting = null, replacer = null, overwriteExisting = true) {
        const text = document.toString(formatting, replacer);
        reliabletxt_io_1.ReliableTxtFile.writeAllTextSync(text, filePath, document.encoding, overwriteExisting);
    }
    static save(document, filePath, formatting = null, replacer = null, overwriteExisting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = document.toString(formatting, replacer);
            yield reliabletxt_io_1.ReliableTxtFile.writeAllText(text, filePath, document.encoding, overwriteExisting);
        });
    }
    static readSync(filePath, reviver = null) {
        return this.loadSync(filePath, reviver).content;
    }
    static read(filePath, reviver = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.load(filePath, reviver);
            return result.content;
        });
    }
    static writeSync(content, filePath, formatting = null, replacer = null, encoding = reliabletxt_1.ReliableTxtEncoding.Utf8, overwriteExisting = true) {
        this.saveSync(new oml_1.OmlDocument(content, encoding), filePath, formatting, replacer, overwriteExisting);
    }
    static write(content, filePath, formatting = null, replacer = null, encoding = reliabletxt_1.ReliableTxtEncoding.Utf8, overwriteExisting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.save(new oml_1.OmlDocument(content, encoding), filePath, formatting, replacer, overwriteExisting);
        });
    }
}
exports.OmlFile = OmlFile;
//# sourceMappingURL=oml-io.js.map