class FlutterTaskProvider {
	constructor() {}
	
	provideTasks() {
		let debug = new Task("Debug");
		//let hotReload = new Task("Hot Reload");
		//let hotRestart = new Task("Hot Restart");
		{
			let action = new TaskDebugAdapterAction('flutter');
			
			action.command = nova.config.get("rbvea.flutterlsp.flutterexec", "string");
			action.args = ["debug_adapter"];
			action.debugArgs = {
				"program": nova.config.get("rbvea.flutterlsp.mainfile", "string"),
				"args": [	
					"--flavor",
					nova.config.get("rbvea.flutterlsp.flavor", "string"),
					"--pid-file",
					"./.flutter_pid",
				]
			};
			
			debug.setAction(Task.Run, action);
		}
		
		// {
		// 	let action = new TaskDebugAdapterAction('flutter');
		// 	
		// 	action.command = "/bin/bash";
		// 	action.args = ["-c", "kill -s SIGUSR1 $(cat ./.flutter_pid)"];
		// 	
		// 	hotReload.setAction(Task.Run, action);
		// }
		// 
		// {
		// 	let action = new TaskDebugAdapterAction('flutter');
		// 	
		// 	action.command = "/bin/bash";
		// 	action.args = ["-c", "kill -s SIGUSR2 $(cat ./.flutter_pid)"];
		// 	
		// 	hotRestart.setAction(Task.Run, action);
		// }
		
		return [debug/*, hotReload, hotRestart*/];	
	}
}

module.exports = new FlutterTaskProvider();