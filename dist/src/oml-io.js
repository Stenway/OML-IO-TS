/* eslint-disable @typescript-eslint/no-explicit-any */
/* (C) Stefan John / Stenway / Stenway.com / 2023 */
import { ReliableTxtEncoding } from "@stenway/reliabletxt";
import { ReliableTxtFile } from "@stenway/reliabletxt-io";
import { OmlDocument } from "@stenway/oml";
// ----------------------------------------------------------------------
export class OmlFile {
    static loadSync(filePath, reviver = null) {
        const reliableTxtDocument = ReliableTxtFile.loadSync(filePath);
        return OmlDocument.parse(reliableTxtDocument.text, reviver, reliableTxtDocument.encoding);
    }
    static async load(filePath, reviver = null) {
        const reliableTxtDocument = await ReliableTxtFile.load(filePath);
        return OmlDocument.parse(reliableTxtDocument.text, reviver, reliableTxtDocument.encoding);
    }
    static saveSync(document, filePath, formatting = null, replacer = null, overwriteExisting = true) {
        const text = document.toString(formatting, replacer);
        ReliableTxtFile.writeAllTextSync(text, filePath, document.encoding, overwriteExisting);
    }
    static async save(document, filePath, formatting = null, replacer = null, overwriteExisting = true) {
        const text = document.toString(formatting, replacer);
        await ReliableTxtFile.writeAllText(text, filePath, document.encoding, overwriteExisting);
    }
    static readSync(filePath, reviver = null) {
        return this.loadSync(filePath, reviver).content;
    }
    static async read(filePath, reviver = null) {
        const result = await this.load(filePath, reviver);
        return result.content;
    }
    static writeSync(content, filePath, formatting = null, replacer = null, encoding = ReliableTxtEncoding.Utf8, overwriteExisting = true) {
        this.saveSync(new OmlDocument(content, encoding), filePath, formatting, replacer, overwriteExisting);
    }
    static async write(content, filePath, formatting = null, replacer = null, encoding = ReliableTxtEncoding.Utf8, overwriteExisting = true) {
        await this.save(new OmlDocument(content, encoding), filePath, formatting, replacer, overwriteExisting);
    }
}
//# sourceMappingURL=oml-io.js.map