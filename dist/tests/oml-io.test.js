import { NoReliableTxtPreambleError, ReliableTxtEncoding } from "@stenway/reliabletxt";
import { OmlDocument } from "@stenway/oml";
import { OmlFile } from "../src/oml-io.js";
import * as fs from 'node:fs';
function getFilePath(name) {
    return "test_files/" + name;
}
const testFilePath = getFilePath("Test.oml");
function writeBytesSync(bytes, filePath) {
    fs.writeFileSync(filePath, bytes);
}
async function writeBytes(bytes, filePath) {
    await fs.promises.writeFile(filePath, bytes);
}
// ----------------------------------------------------------------------
describe("OmlFile.saveSync + loadSync", () => {
    test.each([
        [ReliableTxtEncoding.Utf8],
        [ReliableTxtEncoding.Utf16],
        [ReliableTxtEncoding.Utf16Reverse],
        [ReliableTxtEncoding.Utf32],
    ])("Given %p", (encoding) => {
        const document = OmlDocument.parse("{test=123 test2=true}");
        document.encoding = encoding;
        OmlFile.saveSync(document, testFilePath);
        const loadedDocument = OmlFile.loadSync(testFilePath);
        expect(loadedDocument.toString()).toEqual(document.toString());
        expect(loadedDocument.encoding).toEqual(document.encoding);
    });
    test("Throws", () => {
        writeBytesSync(new Uint8Array([]), testFilePath);
        expect(() => OmlFile.loadSync(testFilePath)).toThrowError(NoReliableTxtPreambleError);
    });
});
describe("OmlFile.save + load", () => {
    test.each([
        [ReliableTxtEncoding.Utf8],
        [ReliableTxtEncoding.Utf16],
        [ReliableTxtEncoding.Utf16Reverse],
        [ReliableTxtEncoding.Utf32],
    ])("Given %p", async (encoding) => {
        const document = OmlDocument.parse("{test=123 test2=true}");
        document.encoding = encoding;
        await OmlFile.save(document, testFilePath);
        const loadedDocument = await OmlFile.load(testFilePath);
        expect(loadedDocument.toString()).toEqual(document.toString());
        expect(loadedDocument.encoding).toEqual(document.encoding);
    });
    test("Throws", async () => {
        await writeBytes(new Uint8Array([]), testFilePath);
        await expect(async () => await OmlFile.load(testFilePath)).rejects.toThrowError(NoReliableTxtPreambleError);
    });
});
describe("OmlFile.writeSync + readSync", () => {
    test("Default encoding", () => {
        OmlFile.writeSync({ test: 123, test2: true }, testFilePath);
        const readContent = OmlFile.readSync(testFilePath);
        expect(readContent).toEqual({ test: 123, test2: true });
    });
    test("Throws", () => {
        writeBytesSync(new Uint8Array([]), testFilePath);
        expect(() => OmlFile.readSync(testFilePath)).toThrowError(NoReliableTxtPreambleError);
    });
});
describe("OmlFile.write + read", () => {
    test("Default encoding", async () => {
        await OmlFile.write({ test: 123, test2: true }, testFilePath);
        const readContent = await OmlFile.read(testFilePath);
        expect(readContent).toEqual({ test: 123, test2: true });
    });
    test("Throws", async () => {
        await writeBytes(new Uint8Array([]), testFilePath);
        await expect(async () => await OmlFile.read(testFilePath)).rejects.toThrowError(NoReliableTxtPreambleError);
    });
});
//# sourceMappingURL=oml-io.test.js.map