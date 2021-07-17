const fs = require ('fs')
const bytes = fs.readFileSync(__dirname + '/loop.wasm')

const n = parseInt(process.argv[2] || "1")

let loop_test = null

let importObj = {
	env: {
		log: function(n, factorial){
			console.log(`${n}! = ${factorial}`)
		}
	}
};

;( async() => {
	let obj = WebAssembly.instantiate(new Uint8Array(bytes), importObj)

	loop_test = (await obj).instance.exports.loop_test

	const factorial = loop_test(n)
	console.log(`result ${n}! = ${factorial}`)
	if(n > 12){
		console.log(`
===============================================================
Factorials greater than 12 are too large for a 32-bit integer.
===============================================================
	`)
	}
})()