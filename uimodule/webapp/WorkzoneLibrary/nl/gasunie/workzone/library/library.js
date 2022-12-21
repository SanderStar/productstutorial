/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library nl.gasunie.workzone.library.
 */
sap.ui.define(["sap/ui/core/library", "sap/m/library"], // library dependency
	function (oCoreLibrary, oMobileLibrary) {

		"use strict";

		const oURLHelper = oMobileLibrary.URLHelper;

		/**
		 * Demo Lib
		 *
		 * @namespace
		 * @name nl.gasunie.workzone.library
		 * @author SAP SE
		 * @version 1.0.0
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "nl.gasunie.workzone.library",
			version: "1.0.0",
			dependencies: ["sap.ui.core"],
			noLibraryCSS: true,
			types: [],
			interfaces: [],
			controls: [
				"nl.gasunie.workzone.library.controls.Example"
			],
			elements: []
		});

		// Consume microsoft libraries
		sap.ui.require([ "nl/gasunie/workzone/library/libs/msal" ]);
        sap.ui.require([ "nl/gasunie/workzone/library/libs/graph" ]);

		const oLibrary = nl.gasunie.workzone.library;

		// Private methods
		function isMobile() {
			// TODO make shorter
			return (sap.ui.Device.system.phone || sap.ui.Device.system.tablet) && (sap.ui.Device.os.ios || sap.ui.Device.os.macintosh || sap.ui.Device.os.android);
		};

		/**
         * The URL is openend via set timeout.
         *
         * Trick is done because of Safari (on mobile).
         *
         * Safari will not open the URL because this function
         * is called in async functions.
         * See calling tree of this function. There is
         * an odata call done before the window.open call.
         * The setTimeout will make it work.
         *
         * @param {*} sURL mobile URL to open
         */
		function openMobileUrl(sURL) {
			setTimeout(() => {
                window.open(sURL);
            });
		};

		oLibrary.getHelloWorld = () => {
			return "Hello world part IX";
		};

		// Expose openUrl to outside
		oLibrary.openUrl = (sURL) => {
			if (isMobile()) {
                openMobileUrl(sURL);
            } else {
                oURLHelper.redirect(sURL, true);
            }
		};

		/* eslint-disable */
		return oLibrary;
		/* eslint-enable */

	}, /* bExport= */ false);