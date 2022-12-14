/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library nl.gasunie.workzone.library.
 */
sap.ui.define(["sap/ui/core/library"], // library dependency
	function () {

		"use strict";

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

		const oLibrary = nl.gasunie.workzone.library;

		oLibrary.getHelloWorld = () => {
			return "Hello world part IV";
		};

		/* eslint-disable */
		return oLibrary;
		/* eslint-enable */

	}, /* bExport= */ false);