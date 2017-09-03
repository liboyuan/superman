var fs = require('fs')

fs.writeFile('writeText','writeFile-test',function(error){
    console.log(error)
})
