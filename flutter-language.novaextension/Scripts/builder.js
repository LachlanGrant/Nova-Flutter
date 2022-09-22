class FlutterTaskProvider {
	constructor() {}
	
	resolveTaskAction(context) {
		let action = context.action;
		let data = context.data;
		let config = context.config;
		
		if (action != Task.Run) return null;
		if (data.type != "flutterDebug") return null;
		
		let action = new TaskDebugAdapterAction("debugflutter");
		
		action.command = "flutter";
		
		let args = ["debug_adapter"];
		let debugArgs = {
			"program": "lib/main_testapp.dart",
			"args": [
				"--flavor", "communic8Test",
			]
		};
		debugArgs.cwd = nova.path.normalize(nova.path.join(nova.workspace.path, workingDirectory));
		action.debugArgs = debugArgs;
		return action;
	}
}

module.exports = FlutterTaskProvider();