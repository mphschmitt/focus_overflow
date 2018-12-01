(function(){
    const HOTNETWORKQUESTIONS = document.getElementById("hotNetworkQuestions");
    const JOBS = document.getElementById("jobs");
    const CHAT = document.getElementById("chat");
    const STACKEXCHANGE = document.getElementById("stackExchange");
    const SOCIAL_NETWORKS = document.getElementById("socialNetworks");

    const GREEN = "#eee";
    const WHITE = "#fff";
    const WHITE2 = "#111";
    const BLACK = "#111";

    const PATH = "content_scripts/";

    var selectElement = (element, value) => {
        element.style.backgroundColor = value ? WHITE : GREEN;
        element.style.color = value ? BLACK : WHITE2;
    }

    var f_hnq = () => {
        chrome.storage.sync.get(['hotNetworkQuestions'], function(value) {
            let hnq = {
                hotNetworkQuestions: !value.hotNetworkQuestions
            };
            chrome.storage.sync.set(hnq, function() {
                selectElement(HOTNETWORKQUESTIONS, hnq.hotNetworkQuestions);
                if (chrome.extension.lastError) {
                    console.log("ERROR: ", chrome.extension.lastError.message);
                } else if (hnq.hotNetworkQuestions) {
                    chrome.tabs.executeScript({
                        file: PATH + 'hotNetworkQuestions_add.js'
                    });
                } else {
                    chrome.tabs.executeScript({
                        file: PATH + "hotNetworkQuestions_remove.js"
                    });
                }
            });
        });
    }

    var f_social = () => {
        chrome.storage.sync.get(["social_networks"], function(value) {
            let social_networks = {
                social_networks: !value.social_networks
            };
            chrome.storage.sync.set(social_networks, function() {
                selectElement(SOCIAL_NETWORKS, social_networks.social_networks);
                if (chrome.extension.lastError) {
                    console.log("ERROR: ", chrome.extension.lastError.message);
                } else if (social_networks.social_networks) {
                    chrome.tabs.executeScript({
                        file: PATH + "social_network_add.js"
                    });
                } else {
                    chrome.tabs.executeScript({
                        file: PATH + "social_network_remove.js"
                    });
                }
            });
        });
    }

    var f_jobs = () => {
        chrome.storage.sync.get(["jobs"], function(value) {
            let jobs = {
                jobs: !value.jobs
            };
            chrome.storage.sync.set(jobs, function() {
                selectElement(JOBS, jobs.jobs);
                if (chrome.extension.lastError) {
                    console.log("ERROR: ", chrome.extension.lastError.message);
                } else if (jobs.jobs) {
                    chrome.tabs.executeScript({
                        file: PATH + "jobs_add.js"
                    });
                } else {
                    chrome.tabs.executeScript({
                        file: PATH + "jobs_remove.js"
                    });
                }
            });
        });
    }

    var f_chat = () => {
        chrome.storage.sync.get(["chat"], function(value) {
            let chat = {
                chat: !value.chat
            };
            chrome.storage.sync.set(chat, function() {
                selectElement(CHAT, chat.chat);
                if (chrome.extension.lastError) {
                    console.log("ERROR: ", chrome.extension.lastError.message);
                } else {
                    chrome.tabs.query({
                        "active": true,
                        "lastFocusedWindow": true
                    }, function(tabs) {
                        if (!tabs || !tabs[0]) return;
                        let url = tabs[0].url;
                        if (url.indexOf("chat.stackoverflow") != -1) {
                            let chat_script = chat.chat ? "chat_add.js" : "chat_remove.js";
                            chrome.tabs.executeScript({
                                file: PATH + chat_script
                            });
                        } else {
                            let chat_script = chat.chat ? "chatBox_add.js" : "chatBox_remove.js";
                            chrome.tabs.executeScript({
                                file: PATH + chat_script
                            })
                        }
                    });
                } 
            });
        });
    }

    var f_stackExchange = () => {
        chrome.storage.sync.get(["stackExchange"], function(value) {
            let stackExchange = {
                stackExchange: !value.stackExchange
            };
            chrome.storage.sync.set(stackExchange, function() {
                selectElement(STACKEXCHANGE, stackExchange.stackExchange);
                if (chrome.extension.lastError) {
                    console.log("ERROR: ", chrome.extension.lastError.message);
                } else  {
                    chrome.tabs.query({
                        "active": true,
                        "lastFocusedWindow": true
                    }, function(tabs) {
                        if (!tabs || !tabs[0]) return;
                        let url = tabs[0].url;
                        if (url.indexOf("stackexchange.com") != -1) {
                            let stackExchange_script = stackExchange.stackExchange ? "stackExchange_add.js" : "stackExchange_remove.js";
                            chrome.tabs.executeScript({
                                file: PATH + stackExchange_script
                            });
                        } else {
                            let stackexchange_script = stackExchange.stackExchange ? "stackexchange_element_add.js" : "stackexchange_element_remove.js";
                            chrome.tabs.executeScript({
                                file: PATH + stackexchange_script
                            })
                        }
                    })
                }
            });
        });
    }

    HOTNETWORKQUESTIONS.addEventListener("click", f_hnq);
    JOBS.addEventListener("click", f_jobs);
    CHAT.addEventListener("click", f_chat);
    STACKEXCHANGE.addEventListener("click", f_stackExchange);
    SOCIAL_NETWORKS.addEventListener("click", f_social);

    chrome.storage.sync.get(["social_networks", "hotNetworkQuestions", "jobs", "chat", "stackExchange"], function(values) {
        selectElement(HOTNETWORKQUESTIONS, values.hotNetworkQuestions);
        selectElement(JOBS, values.jobs);
        selectElement(CHAT, values.chat);
        selectElement(STACKEXCHANGE, values.stackExchange);
        selectElement(SOCIAL_NETWORKS, values.social_networks);
    });
})()