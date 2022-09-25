const FlutterTaskProvider = require("./builder");
const FlutterLanguageServer = require("./lsp");
const FlutterLanguageFormatter = require("./formatter");

var langserver = null;

exports.activate = function() {
    langserver = new FlutterLanguageServer();
    let formatter = new FlutterLanguageFormatter();
    
    nova.workspace.onDidAddTextEditor(async (editor) => {
        editor.onWillSave((editor) => {
            return formatter.format(editor)
        });
    });
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