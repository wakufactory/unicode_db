
var fs = require("fs") ;
fs.readFile("./UnicodeData.txt",function(err,data) {
	var line = data.toString().split("\n") ;
	var r = {} ;
	var a = {} ;
	for(var i =0;i<line.length;i++) {
	    var l = line[i].split(";") ;
	    if(l.length<2) continue ;
	    if(l[1].match('<(.+), (First|Last)>') ) {
	        if (RegExp.$2 == "First")
	            a[RegExp.$1] = {'s':l[0],'c':l[2]} ;
	        else
	            a[RegExp.$1]['e'] = l[0] ;
	    	continue ;
		}
	    var ll = [l[1],l[2]] ;
	    if(l[5]!="") ll.push(l[5])
	    r[l[0]] = ll ;	
	}	
	console.log(JSON.stringify({'range':a,'single':r})) ;  
})
