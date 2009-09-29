dojo.provide('jsorg.Editor');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require("dijit.Editor");
dojo.require("dojo.i18n");
dojo.require("dojo.cache");
dojo.require("dojox.data.CouchDBRestStore");

dojo.declare(
    "jsorg.Editor",
    [dijit._Widget, dijit._Templated], {
	templateString: dojo.cache("jsorg","Editor.html"),
	widgetsInTemplate: true,
	postCreate: function() {
	    dojo.connect(this.saveButton.domNode,"onclick",dojo.hitch(this, this.save));
	    this.db = new dojox.data.CouchDBRestStore({target:"/jsorg"});
	},
	save: function(e) {
	    e.preventDefault();
	    this.logNode.textContent = 'Saving document...';
	    Doc = this.db.getConstructor();
	    doc = new Doc();
	    doc['_id']  = 'foobar';
	    doc['html'] = this.editor.getValue(false);
	    doc['type'] = 'doc';
	    this.db.save();
	    this.logNode.textContent = '';
	},
    }
);
/*
dojo.requireLocalization('sohu','Login');

dojo.declare(
	"sohu.Login",
	[dijit._Widget, dijit._Templated], {	
	    templateString: dojo.cache("sohu", "Login.html"),
	    widgetsInTemplate: true,
	    postCreate: function(){
		this.nls = dojo.i18n.getLocalization('sohu','Login');
		this.usernameLabelNode.textContent = this.nls['username'];
		this.passwordLabelNode.textContent = this.nls['password'];
		this.submitButtonNode.attr('label', this.nls['login']);
	    },
	}
);
    */