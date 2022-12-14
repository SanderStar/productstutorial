sap.ui.define(["tutorial/products/controller/BaseController"], function (Controller) {
    "use strict";

    let oMsalInstance; // we need a global msal instance we can use in lower functions
    let oClient; // we need the client later for more functions without the need to relogin
    let loginResponse; // we only need one logon response but keep it for other functions

    return Controller.extend("tutorial.products.controller.ProductDetail", {
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("ProductDetail").attachMatched(this._onRouteMatched, this);
          },

        createMsalinstance: function() {
            const sDocumentUrl = document.URL;
            const sRedirectURI = this.buildRedirectUrl(sDocumentUrl);
            const sClientID = this.determineClientID(sDocumentUrl);
            const msalConfig = {
                auth: {
                    // clientId: "ef197692-8480-4012-806b-72c634dc1c20", //test tenant
                    // authority: "https://login.microsoftonline.com/{8222c06a-7af7-4ae5-8045-1cdcc600cb64}", // temp tennant id for acceptatie
                    clientId: sClientID,
                    authority: "https://login.microsoftonline.com/{0dba6fac-6971-48f3-9af1-d8a86d20e1ed}",
                    redirectUri: sRedirectURI,
                    navigateToLoginRequestUrl: false
                },
                cache: {
                    cacheLocation: "localStorage"
                }
            };

            // Create an instance of PublicClientApplication
            const msalInstance = new msal.PublicClientApplication(msalConfig);

            return msalInstance;
        },
        buildRedirectUrl: function(URL) {
            const sBasRedirectURI = "https://theia-workspaces-ws-kbsrg.eu20.applicationstudio.cloud.sap/mini-browser//tmp/vscode-unpacked/uicard-dk-1.3.20210319.vsix/extension/resources/previewcard.html";// this.getOwnerComponent().getManifestEntry("/sap.card/configuration/parameters/redirectURI/value");
            const sDocumentUrl = URL;
            const aSplitUrl = sDocumentUrl.split("/");
            const sBaseurlwithouthttps = aSplitUrl[2];
            const sNewRedirectURI = `https://${sBaseurlwithouthttps}/home/`;
            let sRedirectURI = "";
            const bBas = sNewRedirectURI.includes("theia-workspaces-ws-kbsrg.eu20.applicationstudio.cloud.sap");

            if (bBas === true) {
                sRedirectURI = sBasRedirectURI;
            } else {
                sRedirectURI = sNewRedirectURI;
            }

            return sRedirectURI;
        },

        determineClientID: function(URL) {
            const sDocumentUrl = URL;
            let sClientID;

            if (sDocumentUrl.includes("theia-workspaces-ws-kbsrg.eu20.applicationstudio.cloud.sap") || sDocumentUrl.includes("rwq3gqckbfoohuovqtzorh")) { // bas and develop
                sClientID = "2d202bd5-fbe0-4508-8a8a-b95d533f63f5";
            } else if (sDocumentUrl.includes("xssiijqwbfzbqb2n1rtrgc")) { // test
                sClientID = "6b48757c-608c-4474-ba6a-d4525d37e70a";
            } else if (sDocumentUrl.includes("z5uegdtgiunlzodaqnde5y")) { // acc
                sClientID = "9f17b245-9d88-4ed3-b20a-1d8801e3e914";
            } else if (sDocumentUrl.includes("qjtbg8kelizhd0guutdin6")) { // prd
                sClientID = "f508472a-135f-4a19-84d5-6e0f7149d30e";
            }

            return sClientID;
        },

          _onRouteMatched: function (oEvent) {
            oMsalInstance = this.createMsalinstance();

            sap.m.MessageToast.show("Calling library: " + nl.gasunie.workzone.library.getHelloWorld());
            const iProductId = oEvent.getParameter("arguments").productId;
            const oView = this.getView();
            oView.bindElement({
              path: "/Products(" + iProductId + ")",
              events: {
                dataRequested: function () {
                  oView.setBusy(true);
                },
                dataReceived: function () {
                  oView.setBusy(false);
                }
              }
            });
          },

    });
});
