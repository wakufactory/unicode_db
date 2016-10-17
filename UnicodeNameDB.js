"use strict" ;
var UnicodeNameDB =  {
	d_range:null,
	d_single:null,
	isNode:"process" in ((this || 0).self || global),
	load:function() {
		return new Promise(function(resolve,reject) {
			if(UnicodeNameDB.isNode) {
				require('fs') ;
				fs.readFile(__dirname+"/unindb.json",{encoding:"UTF-8"},function(err,data) {
					if(err) reject(err) ;
					else {
						var data = JSON.parse(data) ;
						UnicodeNameDB.d_range = data.range ;
						UnicodeNameDB.d_single = data.single ;
						resolve(data) ;
					}
				}) ;
			} else {
				var req = new XMLHttpRequest();
				req.open("get","unindb.json",true) ;
				req.responseType = "json" ;
				req.onload = function() {
					if(req.status==200) {
						UnicodeNameDB.d_range = req.response.range ;
						UnicodeNameDB.d_single = req.response.single ;
						resolve(req.response) ;
					} else {
						reject(req.status) ;					
					}
				}
				req.send() ;
			}
		})
	},
	get:function(c) {
		if(!UnicodeNameDB.d_range) return null ;
		c = c.toUpperCase() ;
		if(c.length<4) c = ("000"+c).substr(-4) ;
		var r = UnicodeNameDB.range(c) ;
		if(r==null) r = UnicodeNameDB.d_single[c] ;
		if(r==undefined) r = ["-",""] ;
		return r ;
	},
	range:function(c) {
		for(var k in UnicodeNameDB.d_range) {
			var r = UnicodeNameDB.d_range[k] ;
			if(parseInt(c,16)>=parseInt(r.s,16) && parseInt(c,16)<=parseInt(r.e,16)) {
				r.name = k ;
				return [k,r.c] ;	
			}
		}
		return null ;
	},
	split:function(str) {
		var c = [] ;
		for(var i=0;i<str.length;i++) {
			var ch = str.substr(i,1).charCodeAt(0) ;
			var u = UnicodeNameDB.get(ch.toString(16)) ;
			if(ch >= 0xd800 && ch <= 0xdbff && i<str.length-1) {
				var c2 = str.substr(i+1,1).charCodeAt(0) ;
				if(c2>=0xdc00 && c2<=0xdfff) {
					ch = (ch&0x3ff)*0x400+(c2&0x3ff)+0x10000 ;
					u = UnicodeNameDB.get(ch.toString(16)) ;
					i++ ;
				}
			}
			ch = ch.toString(16) ;
			if(ch.length<4) ch = ("000"+ch).substr(-4) ;
			c.push( [ch,u] ) ;
		}
		return c ;
	}
}
if(UnicodeNameDB.isNode) module["exports"] = UnicodeNameDB ;

