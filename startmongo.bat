@echo off
cd "c:\mongodb\bin"
start mongod.exe
timeout 3
start mongo.exe
exit