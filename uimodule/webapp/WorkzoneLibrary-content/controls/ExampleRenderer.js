/*!
 * ${copyright}
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,r){e.write("<div");e.writeControlData(r);e.addClass("sapRULTExample");e.writeClasses();e.write(">");e.write(sap.ui.getCore().getLibraryResourceBundle("nl.gasunie.workzone.library").getText("ANY_TEXT"));e.writeEscaped(r.getText());e.write("</div>")};return e},true);