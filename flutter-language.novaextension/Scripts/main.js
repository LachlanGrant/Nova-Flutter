const FlutterTaskProvider = require("./builder");
const FlutterLanguageServer = require("./lsp");

var langserver = null;

exports.activate = function() {
    langserver = new FlutterLanguageServer();
}

exports.deactivate = function() {
    if (langserver) {
        langserver.deactivate();
        langserver = null;
    }
}
 
nova.assistants.registerTaskAssistant(FlutterTaskProvider, {
    identifier: "flutter",
    name: "Flutter"
});