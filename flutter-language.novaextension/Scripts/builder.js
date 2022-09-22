class FlutterTaskProvider {
	constructor() {}
	
	provideTasks() {
		let runner = new Task("Execute");
		
		let action = new TaskDebugAdapterAction('flutter');
		
		action.command = "/Users/lacgrant/bin/flutter/bin/flutter";
		action.args = ["debug_adapter"];
		action.debugArgs = {
			"program": "lib/main_testapp.dart",
			"args": [
				"--flavor", "communic8Test",
			]
		};
		
		
		runner.setAction(Task.Run, action);
		
		return [runner];	
	}
}

module.exports = new FlutterTaskProvider();