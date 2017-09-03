function abc (something){
    console.log(something)
};

function call(something ,callback){
    something+=' is cool';
    callback(something);
};

call('node',abc)
