/*!
 * ${copyright}
 */
sap.ui.define(["sap/ui/core/library"],function(){"use strict";sap.ui.getCore().initLibrary({name:"nl.gasunie.workzone.library",version:"1.0.0",dependencies:["sap.ui.core"],noLibraryCSS:true,types:[],interfaces:[],controls:["nl.gasunie.workzone.library.controls.Example"],elements:[]});sap.ui.require(["nl/gasunie/workzone/library/libs/msal"]);sap.ui.require(["nl/gasunie/workzone/library/libs/graph"]);const e=nl.gasunie.workzone.library;e.getHelloWorld=()=>"Hello world part VII";return e},false);