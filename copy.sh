#!/usr/bin/env bash

# Testing task (1 version). Not to be used in a pipeline.
# chmod +x copy.sh
# ./copy.sh

# Make sure to clone the library project
# git clone https://github.com/Gasunie-Azure/SAP-BTP-WZ-LIBRARY.git

# Temporary solution for doing unit tests

currentfolder=($PWD)
echo "$currentfolder"

# Clear the working folders
echo "Clearing working tmp folder"
rm -rf "$currentfolder"/uimodule/webapp/WorkzoneLibrary
mkdir "$currentfolder"/uimodule/webapp/WorkzoneLibrary
mkdir "$currentfolder"/uimodule/webapp/WorkzoneLibrary/nl/

rm -rf "$currentfolder"/tmp

# Get workzone library
echo "Clone workzone library to tmp folder"
git clone --branch master https://github.com/SanderStar/CFUI5ExampleLibrary.git "$currentfolder"/tmp
git config pull.rebase false
cd tmp
cd "$currentfolder"

# Fill the working folders
echo "Coping workzone library to working folder"
cp -rf "$currentfolder"/tmp/WorkzoneLibrary/src/manifest.json "$currentfolder"/uimodule/webapp/WorkzoneLibrary/manifest.json
cp -rf "$currentfolder"/tmp/WorkzoneLibrary/src/nl/ "$currentfolder"/uimodule/webapp/WorkzoneLibrary/

rm -rf "$currentfolder"/tmp
