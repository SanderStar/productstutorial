sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/Device", "tutorial/products/model/models", "sap/base/Log"],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.Device} Device
     * @param {typeof sap.base.Log} oLog
     */
    function (UIComponent, Device, models, oLog) {
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

                this.initializeLibrary();
            },
            initializeLibrary: function() {

                const nNotExist = -1;
                // eslint-disable-next-line no-undef
                const oLocation = location;
                const bStudio = oLocation.host.indexOf("studio") > nNotExist || oLocation.host.indexOf("localhost") > nNotExist;

                let sUrl;

                if (bStudio) {
                    oLog.info("Initialize workzone library in local environment");
                    sUrl = "/WorkzoneLibrary-content";
                } else {
                    oLog.info("Initialize workzone library in cloud environment");
                    const n0 = 0;
                    const aHosts = oLocation.ancestorOrigins;
                    const sPostfixUrl = "/nlgasunieworkzonelibrary.nlgasunieworkzonelibrary-1.0.0";

                    sUrl = `${aHosts[n0]}${sPostfixUrl}`;
                }

                sap.ui.loader.config({ paths: { "nl/gasunie/workzone/library": sUrl } });

                sap.ui.require(["nl/gasunie/workzone/library/library"], () => {
                    oLog.info("Workzone library loaded");
                });

            }
        });
    }
);
