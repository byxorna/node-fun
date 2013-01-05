node-fun
========

Code snippets from walking through the "Node: Up and Running" book

Build Notes
-----------

As I am on Archlinux, building node is a pain because arch uses python3 as the default python. To build node.js, set up a virtual env for python2:

```shell
pacman -S python2-virtualenv
cd node-v0.8.16
virtualenv2 env # create virtenv directory for node
. ./env/bin/activate
./configure
make
make install
```

