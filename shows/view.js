function(doc) {
    // !code lib/template.js
    // !json templates

    if(doc)
	return template(templates.view, doc);
    else 
	return templates.newpage;
}