if (location.host.indexOf("studio") > -1) {
    // to make it work in app studio
    console.error("local environment");
    sap.ui.getCore().loadLibrary("be.wl.ScannerAppLibrary", "/bewlScannerAppLibrary/be/wl/ScannerAppLibrary");
} else {
    // to make it work in central approuter and HTML5 App Repo
    console.error("cloud environment");
    // TODO old manner of loading
    sap.ui.getCore().loadLibrary("nl.gasunie.workzone.library", "/nlgasunieworkzonelibrary.nlgasunieworkzonelibrary-1.0.0");
}

sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/Device", "tutorial/products/model/models"],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.Device} Device
     */
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("tutorial.products.Component", {
            metadata: {
                manifest: "json",
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // TODO not needed anymore this.initializeComponent();
            },

            initializeComponent: function() {
                console.error("step 1");
                const nNotExist = -1;
                const oStudio = location.host.indexOf("studio") > nNotExist || location.host.indexOf("localhost") > nNotExist;
                const sUrl = oStudio ? "../.." : "/productservice.tutorialproducts";
                console.error("step 2");
                sap.ui.loader.config({ paths: { "tutorial/products": sUrl } });
                console.error("step 3");

                sap.ui.require(["tutorial/products/Component"], (oComponent) => {
                    console.error("step 4");
                    //oComponent.init();
                });
            }
        });
    }
);
