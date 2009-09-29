// !code lib/template.js
// !json templates

function(doc) {
    if(doc)
	return template(templates.view, doc);
    else 
	return templates.newpage;
}