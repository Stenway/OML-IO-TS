/* eslint-disable @typescript-eslint/no-explicit-any */
/* (C) Stefan John / Stenway / Stenway.com / 2023 */

import { ReliableTxtDocument, ReliableTxtEncoding } from "@stenway/reliabletxt"
import { ReliableTxtFile } from "@stenway/reliabletxt-io"
import { OmlDocument, OmlFormatting, OmlReplacer, OmlReviver } from "@stenway/oml"

// ----------------------------------------------------------------------

export abstract class OmlFile {
	static loadSync(filePath: string, reviver: OmlReviver | null = null): OmlDocument {
		const reliableTxtDocument: ReliableTxtDocument = ReliableTxtFile.loadSync(filePath)
		return OmlDocument.parse(reliableTxtDocument.text, reviver, reliableTxtDocument.encoding)
	}

	static async load(filePath: string, reviver: OmlReviver | null = null): Promise<OmlDocument> {
		const reliableTxtDocument: ReliableTxtDocument = await ReliableTxtFile.load(filePath)
		return OmlDocument.parse(reliableTxtDocument.text, reviver, reliableTxtDocument.encoding)
	}

	static saveSync(document: OmlDocument, filePath: string, formatting: OmlFormatting | null = null, replacer: OmlReplacer | null = null, overwriteExisting: boolean = true) {
		const text: string = document.toString(formatting, replacer)
		ReliableTxtFile.writeAllTextSync(text, filePath, document.encoding, overwriteExisting)
	}

	static async save(document: OmlDocument, filePath: string, formatting: OmlFormatting | null = null, replacer: OmlReplacer | null = null, overwriteExisting: boolean = true) {
		const text: string = document.toString(formatting, replacer)
		await ReliableTxtFile.writeAllText(text, filePath, document.encoding, overwriteExisting)
	}

	static readSync(filePath: string, reviver: OmlReviver | null = null): any {
		return this.loadSync(filePath, reviver).content
	}

	static async read(filePath: string, reviver: OmlReviver | null = null): Promise<any> {
		const result = await this.load(filePath, reviver)
		return result.content
	}

	static writeSync(content: any, filePath: string, formatting: OmlFormatting | null = null, replacer: OmlReplacer | null = null, encoding: ReliableTxtEncoding = ReliableTxtEncoding.Utf8, overwriteExisting: boolean = true) {
		this.saveSync(new OmlDocument(content, encoding), filePath, formatting, replacer, overwriteExisting)
	}

	static async write(content: any, filePath: string, formatting: OmlFormatting | null = null, replacer: OmlReplacer | null = null, encoding: ReliableTxtEncoding = ReliableTxtEncoding.Utf8, overwriteExisting: boolean = true) {
		await this.save(new OmlDocument(content, encoding), filePath, formatting, replacer, overwriteExisting)
	}
}