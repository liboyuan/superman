var fs = require('fs')

fs.readFile('test.txt',function(err,data){
    if(err){
		console.log(err)
    }else{
        console.log(data.toString())
    }
})
//fs.writeFile()
