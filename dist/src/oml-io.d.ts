import { ReliableTxtEncoding } from "@stenway/reliabletxt";
import { OmlDocument, OmlFormatting, OmlReplacer, OmlReviver } from "@stenway/oml";
export declare abstract class OmlFile {
    static loadSync(filePath: string, reviver?: OmlReviver | null): OmlDocument;
    static load(filePath: string, reviver?: OmlReviver | null): Promise<OmlDocument>;
    static saveSync(document: OmlDocument, filePath: string, formatting?: OmlFormatting | null, replacer?: OmlReplacer | null, overwriteExisting?: boolean): void;
    static save(document: OmlDocument, filePath: string, formatting?: OmlFormatting | null, replacer?: OmlReplacer | null, overwriteExisting?: boolean): Promise<void>;
    static readSync(filePath: string, reviver?: OmlReviver | null): any;
    static read(filePath: string, reviver?: OmlReviver | null): Promise<any>;
    static writeSync(content: any, filePath: string, formatting?: OmlFormatting | null, replacer?: OmlReplacer | null, encoding?: ReliableTxtEncoding, overwriteExisting?: boolean): void;
    static write(content: any, filePath: string, formatting?: OmlFormatting | null, replacer?: OmlReplacer | null, encoding?: ReliableTxtEncoding, overwriteExisting?: boolean): Promise<void>;
}
//# sourceMappingURL=oml-io.d.ts.map