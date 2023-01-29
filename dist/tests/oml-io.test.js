"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const reliabletxt_1 = require("@stenway/reliabletxt");
const oml_1 = require("@stenway/oml");
const src_1 = require("../src");
const fs = __importStar(require("fs"));
function getFilePath(name) {
    return "test_files/" + name;
}
const testFilePath = getFilePath("Test.oml");
function writeBytesSync(bytes, filePath) {
    fs.writeFileSync(filePath, bytes);
}
function writeBytes(bytes, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.promises.writeFile(filePath, bytes);
    });
}
// ----------------------------------------------------------------------
describe("OmlFile.saveSync + loadSync", () => {
    test.each([
        [reliabletxt_1.ReliableTxtEncoding.Utf8],
        [reliabletxt_1.ReliableTxtEncoding.Utf16],
        [reliabletxt_1.ReliableTxtEncoding.Utf16Reverse],
        [reliabletxt_1.ReliableTxtEncoding.Utf32],
    ])("Given %p", (encoding) => {
        const document = oml_1.OmlDocument.parse("{test=123 test2=true}");
        document.encoding = encoding;
        src_1.OmlFile.saveSync(document, testFilePath);
        const loadedDocument = src_1.OmlFile.loadSync(testFilePath);
        expect(loadedDocument.toString()).toEqual(document.toString());
        expect(loadedDocument.encoding).toEqual(document.encoding);
    });
    test("Throws", () => {
        writeBytesSync(new Uint8Array([]), testFilePath);
        expect(() => src_1.OmlFile.loadSync(testFilePath)).toThrowError(reliabletxt_1.NoReliableTxtPreambleError);
    });
});
describe("OmlFile.save + load", () => {
    test.each([
        [reliabletxt_1.ReliableTxtEncoding.Utf8],
        [reliabletxt_1.ReliableTxtEncoding.Utf16],
        [reliabletxt_1.ReliableTxtEncoding.Utf16Reverse],
        [reliabletxt_1.ReliableTxtEncoding.Utf32],
    ])("Given %p", (encoding) => __awaiter(void 0, void 0, void 0, function* () {
        const document = oml_1.OmlDocument.parse("{test=123 test2=true}");
        document.encoding = encoding;
        yield src_1.OmlFile.save(document, testFilePath);
        const loadedDocument = yield src_1.OmlFile.load(testFilePath);
        expect(loadedDocument.toString()).toEqual(document.toString());
        expect(loadedDocument.encoding).toEqual(document.encoding);
    }));
    test("Throws", () => __awaiter(void 0, void 0, void 0, function* () {
        yield writeBytes(new Uint8Array([]), testFilePath);
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield src_1.OmlFile.load(testFilePath); })).rejects.toThrowError(reliabletxt_1.NoReliableTxtPreambleError);
    }));
});
describe("OmlFile.writeSync + readSync", () => {
    test("Default encoding", () => {
        src_1.OmlFile.writeSync({ test: 123, test2: true }, testFilePath);
        const readContent = src_1.OmlFile.readSync(testFilePath);
        expect(readContent).toEqual({ test: 123, test2: true });
    });
    test("Throws", () => {
        writeBytesSync(new Uint8Array([]), testFilePath);
        expect(() => src_1.OmlFile.readSync(testFilePath)).toThrowError(reliabletxt_1.NoReliableTxtPreambleError);
    });
});
describe("OmlFile.write + read", () => {
    test("Default encoding", () => __awaiter(void 0, void 0, void 0, function* () {
        yield src_1.OmlFile.write({ test: 123, test2: true }, testFilePath);
        const readContent = yield src_1.OmlFile.read(testFilePath);
        expect(readContent).toEqual({ test: 123, test2: true });
    }));
    test("Throws", () => __awaiter(void 0, void 0, void 0, function* () {
        yield writeBytes(new Uint8Array([]), testFilePath);
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield src_1.OmlFile.read(testFilePath); })).rejects.toThrowError(reliabletxt_1.NoReliableTxtPreambleError);
    }));
});
//# sourceMappingURL=oml-io.test.js.map