const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/helloworld.wasm')

let helloWorld = null
let startStringIndex = 100
let memory = new WebAssembly.Memory({ initial: 1 })

let importObject = {
	env: {
		buffer: memory,
		start_string: startStringIndex,
		print_string: function (strLen){
			const bytes = new Uint8Array (memory.buffer, startStringIndex, strLen)
			const logString = new TextDecoder('utf8').decode(bytes)
			console.log(logString)
		}
	}
};

(async()=>{
	let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject)
	const {helloworld: helloWorld} = obj.instance.exports;
	helloWorld();
})();