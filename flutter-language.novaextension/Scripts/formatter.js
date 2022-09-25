class FlutterLanguageFormatter {
	constructor() {
		
	}
	
	format(editor) {
		const filePath = editor.document.path;
		if (!filePath) return;
		if (filePath.substr(-5) === '.dart') {
			const fmtProcess = new Process(nova.config.get("rbvea.flutterlsp.flutterexec", "string"), {
			  args: ["format", filePath],
			});
			fmtProcess.start();
		}
	}
}


module.exports = FlutterLanguageFormatter;