const fs = require('fs')
const bytes = fs.readFileSync(__dirname + '/func_perform.wasm')

let i = 0;
let importObject = {
	js: {
		external_call: function (){
			i++
			return i
		}
	}
}

;( async() => {
	const obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject)

	const {wasm_call, js_call} = obj.instance.exports

	const startWasm = process.hrtime.bigint()
	wasm_call()
	const endWasm = process.hrtime.bigint()
	console.log(`wasm_call = ${(endWasm-startWasm)/BigInt(1000000)}ms`)

	const startJs = process.hrtime.bigint()
	js_call()
	const endJs = process.hrtime.bigint()
	console.log(`js_call = ${(endJs-startJs)/BigInt(1000000)}ms`)
})()