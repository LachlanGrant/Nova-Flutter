class FlutterLanguageServer {
	constructor() {
		nova.config.observe('rbvea.flutterlsp', function(path) {
			this.start();
		}, this);
	}
	
	deactivate() {
		this.stop();
	}
	
	start() {
		if (this.languageClient) {
			this.languageClient.stop();
			nova.subscriptions.remove(this.languageClient);
		}
		
		let serverOptions = {
			path: nova.config.get("rbvea.flutterlsp.dartexec", "string"),
			args: [nova.config.get("rbvea.flutterlsp.snapshotpath", "string"), "--lsp"]
		};
		
		let clientOptions = {
			initializationOptions: {
				onlyAnalyzeProjectsWithOpenFiles: true,
				suggestFromUnimportedLibraries: true,
				closingLabels: true,
				outline: true,
				flutterOutline: true
			  },
			syntaxes: ['dart']
		};
		
		let client = new LanguageClient('flutter-language-server', 'Flutter Language Server', serverOptions, clientOptions);
		
		try {
			console.log("Starting Client");
			client.start();
			
			nova.subscriptions.add(client);
			this.languageClient = client;
			console.log("Start Complete!!");
		}
		catch (err) {
			if (nova.inDevMode()) {
				console.error(err);
			}
		}
	}
	
	stop() {
		if (this.languageClient) {
			this.languageClient.stop();
			nova.subscriptions.remove(this.languageClient);
			this.languageClient = null;
		}
	}
}


module.exports = FlutterLanguageServer;