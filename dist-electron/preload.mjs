let electron = require("electron");
//#region electron/preload.ts
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
	on(...args) {
		const [channel, listener] = args;
		return electron.ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
	},
	off(...args) {
		const [channel, ...omit] = args;
		return electron.ipcRenderer.off(channel, ...omit);
	},
	send(...args) {
		const [channel, ...omit] = args;
		return electron.ipcRenderer.send(channel, ...omit);
	},
	invoke(...args) {
		const [channel, ...omit] = args;
		return electron.ipcRenderer.invoke(channel, ...omit);
	}
});
electron.contextBridge.exposeInMainWorld("api", {
	campaignDays: {
		list: () => electron.ipcRenderer.invoke("campaignDays:list"),
		create: (name) => electron.ipcRenderer.invoke("campaignDays:create", name),
		active: (id) => electron.ipcRenderer.invoke("campaignDays:active", id),
		delete: (id) => electron.ipcRenderer.invoke("campaignDays:delete", id),
		increase: (id) => electron.ipcRenderer.invoke("campaignDays:increase", id),
		decrease: (id) => electron.ipcRenderer.invoke("campaignDays:decrease", id)
	},
	config: { update: (id, config) => electron.ipcRenderer.invoke("config:update", id, config) }
});
//#endregion
