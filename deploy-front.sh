#!/bin/bash
sudo rm -rf /home/deploy/vrgdw/web/*
sudo rm -rf /home/deploy/vrgdw/mobile/*

cd /home/deploy/tmp/build
cp -r . /home/deploy/vrgdw/web
cd /home/deploy/vrgdw/web
mkdir board
mv board.html board/index.html

cd /home/deploy/tmp/build-m
cp -r . /home/deploy/vrgdw/mobile
cd /home/deploy/vrgdw/mobile
mkdir board
mv board.html board/index.html

sudo rm -rf /home/deploy/tmp/build
sudo rm -rf /home/deploy/tmp/build-m

cd /home/deploy/scripts
./nginx.sh restart