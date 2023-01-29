# OML-IO

## About

This package gives you OML file reading and writing functionality. Learn more about OML in the [@stenway/oml package](https://www.npmjs.com/package/@stenway/oml).

## Installation

Using NPM:
```
npm install @stenway/oml-io
```

## Getting started

The writeSync method of the OmlFile class directly takes a JavaScript object/value as argument, stringifies it and saves it as a text file. The readSync method then loads the text file, parses it and returns an object/value:

```ts
import { OmlFile } from '@stenway/oml-io'

let filePath = "Test.oml"
OmlFile.writeSync({test: 123, test2: true}, filePath)
console.log(OmlFile.readSync(filePath))
```

When you have an OmlDocument object, you can use the loadSync and saveSync method:

```ts
import { OmlDocument } from '@stenway/oml'
import { OmlFile } from '@stenway/oml-io'

let filePath = "Test.oml"
let document = OmlDocument.parse(`{test=123 test2=true}`)
OmlFile.saveSync(document, filePath)

let loadedDocument = OmlFile.loadSync(filePath)
console.log(loadedDocument.content)
```

## Asynchronous IO

The read, write, load and save methods are the asynchronous equivalents of the synchronous readSync, writeSync, loadSync and saveSync methods.

```ts
let filePath = "Test.oml"
await OmlFile.write({test: 123, test2: true}, filePath)
let result = await OmlFile.read(filePath)
console.log(result)
```

## Formatting, replacing and reviving

The write and save methods have formatting and replacer parameters like the Oml.stringify method and the read and load methods have a reviver parameter like the Oml.parse method, with which you can control how serialization and deserialization will be handled. Here is an example where the number 123 will be replaced with the string `"<Replaced>"` when serialized, and the other way around when it's deserialized:

```ts
let filePath = "Test.oml"
let document = OmlDocument.parse(`{test=123 test2=true}`)
OmlFile.saveSync(document, filePath, {}, (root, owner, key, value) => {
	if (value === 123) { return "<Replaced>" }
	return value
})

let loadedDocument = OmlFile.loadSync(filePath, (owner, key, value) => {
	if (value === "<Replaced>") { return 123 }
	return value
})
console.log(loadedDocument.content)
```

The resulting OML file will look like this:
```
{
	test  = <Replaced>
	test2 = true
}
```

## Bye Bye CSV -> Table Data as OML-Files

If you don't want to use CSV to write table data, you can use OML to do that. Because OML doesn't require so many double-quotes like JSON and you don't have to write commas, tabular data looks much more natural:
```ts
let tableContent = 
`[
  [FirstName      LastName  Age  PlaceOfBirth]
  [William        Smith     30   Boston]
  [Olivia         Jones     27   "San Francisco"]
  [Lucas          Brown     null Chicago]
]`
OmlFile.saveSync(OmlDocument.parse(tableContent), "Table.oml")

let tableData = OmlFile.readSync("Table.oml")
console.log(Oml.stringify(tableData, {}))
```
And because OML files are [ReliableTXT files](https://www.reliabletxt.com), you never need to worry about encoding again.

If you want an even more natural way to write tabular data, have a look at [TBL](https://www.youtube.com/watch?v=BkASqYznmE8) which is an [SML-based](https://www.simpleml.com) format.

## Videos
* [Why I like the UTF-8 Byte Order Mark (BOM)](https://www.youtube.com/watch?v=VgVkod9HQTo)
* [Stop Using Windows Line Breaks (CRLF)](https://www.youtube.com/watch?v=YPtMCiHj7F8)
