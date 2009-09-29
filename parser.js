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
function ch(chr) {
    return function(s) {
	if(s == "" || s.charAt(0) != chr)
	    return { error : "Expected '"+chr+"'", str : s }
	else
	    return { res : chr, str : s.substr(1) }
    }
}

// Match any of the given parsers
function or(parsers) {
    function orAt(idx) {
	if(parsers.length <= idx)
	    return function(s) { return { error : "Or!", str : s }}
	else
	    return function(s) {
		var res = parsers[idx](s);
		if(res.res)
		    return res;
		else
		    return orAt(idx+1)(s);
	    }
    }
    return orAt(0);
}
// optional
function optional(parser, defaultValue) {
    //    return or([parser, trans(empty(), function(x) { return defaultValue; })]);
    return function(s) { 
	var res = parser(res);
	if(res.res)
	    return res;
	else
	    return { res: defaultValue, str: s };
    }
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
