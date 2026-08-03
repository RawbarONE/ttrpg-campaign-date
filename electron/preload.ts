import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
	on(...args: Parameters<typeof ipcRenderer.on>) {
		const [channel, listener] = args;
		return ipcRenderer.on(channel, (event, ...args) =>
			listener(event, ...args),
		);
	},
	off(...args: Parameters<typeof ipcRenderer.off>) {
		const [channel, ...omit] = args;
		return ipcRenderer.off(channel, ...omit);
	},
	send(...args: Parameters<typeof ipcRenderer.send>) {
		const [channel, ...omit] = args;
		return ipcRenderer.send(channel, ...omit);
	},
	invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
		const [channel, ...omit] = args;
		return ipcRenderer.invoke(channel, ...omit);
	},

	// You can expose other APTs you need here.
	// ...
});

contextBridge.exposeInMainWorld("api", {
	campaignDays: {
		list: () => ipcRenderer.invoke("campaignDays:list"),
		create: (name: string) => ipcRenderer.invoke("campaignDays:create", name),
		active: (id: number) => ipcRenderer.invoke("campaignDays:active", id),
		delete: (id: number) => ipcRenderer.invoke("campaignDays:delete", id),
		increase: (id: number) => ipcRenderer.invoke("campaignDays:increase", id),
		decrease: (id: number) => ipcRenderer.invoke("campaignDays:decrease", id),
	},
});
