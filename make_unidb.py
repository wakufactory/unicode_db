import json
import re

f = open("UnicodeData.txt","r")
r = {}
a = {} 
for line in f:
    l = line.split(";")
    m = re.match('<(.+)(First|Last)>',l[1])
    if m :
        if m.group(2) == "First":
            a[m.group(1)] = {'s':l[0],'c':l[2]}
        else:
            a[m.group(1)]['e'] = l[0]
    	continue
    ll = [l[1],l[2]] ;
    if l[5]!="" :
        ll.append(l[5])
    r[l[0]] = ll
 
#print a
print json.dumps({'range':a,'single':r})  