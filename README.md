#Unicode name DB json

##Usage
###Browser JavaScript ;
```
UnicodeNameDB.load().then(function() {
	console.log( UnicodeNameDB.split("abc") ) ;
}) ;
```

###Node.js
```
var db = require("./UnicodeNameDB") ;
db.load().then(() => {
	console.log( db.split("abc") ) ;
}) ;
```

##sample
unichar.html : list Unicode code point and Unicode name

