/*
 * Parsers are functions from String to X
 * X is either
 * { res: value, str: rest of input}
 * { error: description, str: rest of input}
 *
 */

// Match the empty string
function empty() {
    return function(s) { return { res: true, str: s } }
}

// Match a given character
function ch(ch) {
    return function(s) {
	if(s == "" || s.charAt(0) != ch)
	    return { error : "Expected '"+ch+"'", str : s }
	else
	    return { res : ch, str : s.substr(1) }
    }
}

// Match any of the given parsers
function or(ls) {
    function orAt(ls,idx) {
	if(ls.length <= idx)
	    return function(s) { return { error : "Or!", str : s }}
	else
	    return function(s) {
		var res = ls[idx](s);
		if(res.res)
		    return res;
		else
		    return orAt(ls,idx+1)(s);
	    }
    }
    return orAt(ls,0);
}

// Apply a function to the parse result
function trans(parser, func) {
    return function(s) {
	var res = parser(s);
	if(res.res)
	    res.res = func(res.res);
	return res;
    }
}

/*
 // Match the given regular expression
 function re(regexp) { ...}
 // Match the sequence of parsers and return results in an array
 function seq(array) { ... }
 // Match if the given parser does not match
 function not(parser) { ... }
 */

//// TESTING

var p = or([ch('a'), ch('b')])

function t(s) {
    var res = p(s);
    if(res.res)
	print(s+" -> { res: "+res.res+", str: "+res.str+"}");
    else
	print(s+" -> { error: "+res.error+", str: "+res.str+"}");
}

t('foo');
t('aaa');
t('bcd');
