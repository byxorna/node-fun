node-fun
========

Code snippets from walking through the "Node: Up and Running" book

Purpose
-------

Ive been wanting to really toy with client side MVC and event driven views for a while, but havent been able to find a project to use as an excuse to play with this stuff. I want to make a fully event and fragment driven site, because:

- I havent had time to fully implement the whole backbone stack (ive only made sites that used the model/collection persistence, no templating/controllers)
- Ive never made a proper JS heavy website where #fragments worked like they do in gmail

Build and Run
-----------------

Once you have a functioning node installation (see below), just run `npm install` to install dependencies. Then, `node app`.

Building Node
-------------

As I am on Archlinux, building node is a pain because arch uses python3 as the default python. To build node.js, set up a virtual env for python2:

```shell
pacman -S python2-virtualenv
cd node-v0.8.16
virtualenv2 env # create virtenv directory for node
. ./env/bin/activate
./configure --prefix=~/lang
make
make install
```

