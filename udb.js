UnicodeDB =  {
	d_range:null,
	d_single:null,
	load:function() {
		return new Promise(function(resolve,reject) {
			var req = new XMLHttpRequest();
			req.open("get","ud.json",true) ;
			req.responseType = "json" ;
			req.onload = function() {
				if(req.status==200) {
					UnicodeDB.d_range = req.response.range ;
					UnicodeDB.d_single = req.response.single ;
					resolve(req.response) ;
				} else {
					reject(req.status) ;					
				}
			}
			req.send() ;
		})
	},
	get:function(c) {
		if(!UnicodeDB.d_range) return null ;
		c = c.toUpperCase() ;
		if(c.length<4) c = ("000"+c).substr(-4) ;
		var r = UnicodeDB.range(c) ;
		if(r==null) r = UnicodeDB.d_single[c] ;
		if(r==undefined) r = ["-",""] ;
		return r ;
	},
	range:function(c) {
		for(var k in UnicodeDB.d_range) {
			var r = UnicodeDB.d_range[k] ;
			if(parseInt(c,16)>=parseInt(r.s,16) && parseInt(c,16)<=parseInt(r.e,16)) {
				r.name = k ;
				return [k,r.c] ;	
			}
		}
		return null ;
	},
	strip:function(str) {
		var c = [] ;
		for(var i=0;i<str.length;i++) {
			var ch = str.substr(i,1).charCodeAt(0) ;
			var u = UnicodeDB.get(ch.toString(16)) ;
			if(u[0]=="Non Private Use High Surrogate, " && i<str.length-1) {
				var c2 = str.substr(i+1,1).charCodeAt(0) ;
				var u2 = UnicodeDB.get(c2.toString(16)) ;
				if(u2[0]=="Low Surrogate, ") {
					ch = (ch&0x3ff)*0x400+(c2&0x3ff)+0x10000 ;
					u = UnicodeDB.get(ch.toString(16)) ;
					i++ ;
				}
			}
			c.push( [ch.toString(16),u] ) ;
		}
		return c ;
	}
}
