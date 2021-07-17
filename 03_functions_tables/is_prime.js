const fs = require('fs')
const bytes = fs.readFileSync(__dirname + '/is_prime.wasm')

const value = parseInt(process.argv[2])

;( async() => {
	const obj = await WebAssembly.instantiate(new Uint8Array(bytes))
	if(Boolean(obj.instance.exports.is_prime(value))){
		console.log(`${value} IS a prime!`)
	} else {
		console.log(`${value} IS NOT a prime!`)
	}
})()
