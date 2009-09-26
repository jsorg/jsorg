Setup
=====

Tools needed
------------

* git
* couchdb
* python-setuptools (for couchapp)

Initialization
--------------

Start couchdb


    git clone git://github.com/jsorg/jsorg.git
    cd jsorg
    git submodule init
    sudo easy_install -U couchapp
    couchapp push

Browse [http://localhost:5984/jsorg/_design/jsorg/jsorg.html](http://localhost:5984/jsorg/_design/jsorg/jsorg.html)