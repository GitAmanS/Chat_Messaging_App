exports.getHomepage = (request,response,next)=>{
    response.sendFile('home.html',{root:'views'});
}
exports.getErrorpage = (request,response,next)=>{
    response.sendFile('not-found.html',{root:'views'});
}
exports.getMainpage = (request,response,next)=>{
    response.sendFile('main.html',{root:'views'});
}