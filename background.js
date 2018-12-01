chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set(
		{
			social_networks: true,
			hotNetworkQuestions: true,
			chat: true,
			stackExchange: true,
			jobs: true
		}
	);
});

var injectScripts = (tabId, details) => {
	const path = "content_scripts/";
	chrome.storage.sync.get(["social_networks", "hotNetworkQuestions", "jobs", "chat", "stackExchange"], function(values) {

		let hotNetworkQuestions_script = values.hotNetworkQuestions ? "hotNetworkQuestions_add.js" : "hotNetworkQuestions_remove.js";
		chrome.tabs.executeScript(tabId, {
			file: path + hotNetworkQuestions_script
		}, () => {
			if (chrome.extension.lastError) {
				console.log("ERROR: ", chrome.extension.lastError.message);
			}
		});

		let jobs_script = values.jobs ? "jobs_add.js" : "jobs_remove.js";
		chrome.tabs.executeScript(tabId, {
			file: path + jobs_script
		}, () => {
			if (chrome.extension.lastError) {
				console.log("ERROR: ", chrome.extension.lastError.message);
			}
		});

		let socialNetworks_script = values.social_networks ? "social_network_add.js" : "social_network_remove.js";
		chrome.tabs.executeScript(tabId, {
			file: path + socialNetworks_script
		}, () => {
			if (chrome.extension.lastError) {
				console.log("ERROR: ", chrome.extension.lastError.message);
			}
		});

		// chat & stackexchange
		chrome.tabs.query({
			"active": true,
			"lastFocusedWindow": true
		}, function(tabs) {
			if (!tabs || !tabs[0]) return;
			let url = tabs[0].url;
			if (url.indexOf("stackexchange.com") != -1) {
				let stackExchange_script = values.stackExchange ? "stackExchange_add.js" : "stackExchange_remove.js";
				chrome.tabs.executeScript(tabId, {
					file: path + stackExchange_script
				}, () => {
					if (chrome.extension.lastError) {
						console.log("ERROR: ", chrome.extension.lastError.message);
					}
				});
			} else if (url.indexOf("chat.stackoverflow") != -1) {
				let chat_script = values.chat ? "chat_add.js" : "chat_remove.js";
				chrome.tabs.executeScript(tabId, {
					file: path + chat_script
				}, () => {
					if (chrome.extension.lastError) {
						console.log("ERROR: ", chrome.extension.lastError.message);
					}
				});
			} else {
				if (!values.chat) {
					let chat_script = values.chat ? "chatBox_add.js" : "chatBox_remove.js";
					chrome.tabs.executeScript(tabId, {
						file: path + chat_script
					}, () => {
						if (chrome.extension.lastError) {
							console.log("ERROR: ", chrome.extension.lastError.message);
						}
					})
				}
				if (!values.stackExchange) {
					let stackexchange_script = values.stackExchange ? "stackexchange_element_add.js" : "stackexchange_element_remove.js";
					chrome.tabs.executeScript(tabId, {
						file: path + stackexchange_script
					}, () => {
						if (chrome.extension.lastError) {
							console.log("ERROR: ", chrome.extension.lastError.message);
						}
					})
				}
			}
		});
	})
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	injectScripts(tabId, changeInfo);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	injectScripts(activeInfo.tabId, activeInfo.windowId);
});
