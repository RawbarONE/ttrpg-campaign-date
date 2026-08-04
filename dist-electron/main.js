import { BrowserWindow, app, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as path$1 from "node:path";
import path from "node:path";
import Database from "better-sqlite3";
import * as runtime from "@prisma/client/runtime/client";
//#region node_modules/@prisma/debug/dist/index.mjs
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
var colors_exports = {};
__export(colors_exports, {
	$: () => $,
	bgBlack: () => bgBlack,
	bgBlue: () => bgBlue,
	bgCyan: () => bgCyan,
	bgGreen: () => bgGreen,
	bgMagenta: () => bgMagenta,
	bgRed: () => bgRed,
	bgWhite: () => bgWhite,
	bgYellow: () => bgYellow,
	black: () => black,
	blue: () => blue,
	bold: () => bold,
	cyan: () => cyan,
	dim: () => dim,
	gray: () => gray,
	green: () => green,
	grey: () => grey,
	hidden: () => hidden,
	inverse: () => inverse,
	italic: () => italic,
	magenta: () => magenta,
	red: () => red,
	reset: () => reset,
	strikethrough: () => strikethrough,
	underline: () => underline,
	white: () => white,
	yellow: () => yellow
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
	({FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM} = process.env || {});
	isTTY = process.stdout && process.stdout.isTTY;
}
var $ = { enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY) };
function init(x, y) {
	let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
	let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
	return function(txt) {
		if (!$.enabled || txt == null) return txt;
		return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
	};
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
var MAX_ARGS_HISTORY = 100;
var COLORS = [
	"green",
	"yellow",
	"blue",
	"magenta",
	"cyan",
	"red"
];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ??= processEnv.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
var topProps = {
	enable(namespace) {
		if (typeof namespace === "string") globalThis.DEBUG = namespace;
	},
	disable() {
		const prev = globalThis.DEBUG;
		globalThis.DEBUG = "";
		return prev;
	},
	enabled(namespace) {
		const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
			return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
		});
		const isListened = listenedNamespaces.some((listenedNamespace) => {
			if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
			return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
		});
		const isExcluded = listenedNamespaces.some((listenedNamespace) => {
			if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
			return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
		});
		return isListened && !isExcluded;
	},
	log: (...args) => {
		const [namespace, format, ...rest] = args;
		(console.warn ?? console.log)(`${namespace} ${format}`, ...rest);
	},
	formatters: {}
};
function debugCreate(namespace) {
	const instanceProps = {
		color: COLORS[lastColor++ % COLORS.length],
		enabled: topProps.enabled(namespace),
		namespace,
		log: topProps.log,
		extend: () => {}
	};
	const debugCall = (...args) => {
		const { enabled, namespace: namespace2, color, log } = instanceProps;
		if (args.length !== 0) argsHistory.push([namespace2, ...args]);
		if (argsHistory.length > MAX_ARGS_HISTORY) argsHistory.shift();
		if (topProps.enabled(namespace2) || enabled) {
			const stringArgs = args.map((arg) => {
				if (typeof arg === "string") return arg;
				return safeStringify(arg);
			});
			const ms = `+${Date.now() - lastTimestamp}ms`;
			lastTimestamp = Date.now();
			if (globalThis.DEBUG_COLORS) log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
			else log(namespace2, ...stringArgs, ms);
		}
	};
	return new Proxy(debugCall, {
		get: (_, prop) => instanceProps[prop],
		set: (_, prop, value) => instanceProps[prop] = value
	});
}
var Debug = new Proxy(debugCreate, {
	get: (_, prop) => topProps[prop],
	set: (_, prop, value) => topProps[prop] = value
});
function safeStringify(value, indent = 2) {
	const cache = /* @__PURE__ */ new Set();
	return JSON.stringify(value, (key, value2) => {
		if (typeof value2 === "object" && value2 !== null) {
			if (cache.has(value2)) return `[Circular *]`;
			cache.add(value2);
		} else if (typeof value2 === "bigint") return value2.toString();
		return value2;
	}, indent);
}
//#endregion
//#region node_modules/@prisma/driver-adapter-utils/dist/index.mjs
var DriverAdapterError = class extends Error {
	name = "DriverAdapterError";
	cause;
	constructor(payload) {
		super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
		this.cause = payload;
	}
};
Debug("driver-adapter-utils");
var ColumnTypeEnum = {
	Int32: 0,
	Int64: 1,
	Float: 2,
	Double: 3,
	Numeric: 4,
	Boolean: 5,
	Character: 6,
	Text: 7,
	Date: 8,
	Time: 9,
	DateTime: 10,
	Json: 11,
	Enum: 12,
	Bytes: 13,
	Set: 14,
	Uuid: 15,
	Int32Array: 64,
	Int64Array: 65,
	FloatArray: 66,
	DoubleArray: 67,
	NumericArray: 68,
	BooleanArray: 69,
	CharacterArray: 70,
	TextArray: 71,
	DateArray: 72,
	TimeArray: 73,
	DateTimeArray: 74,
	JsonArray: 75,
	EnumArray: 76,
	BytesArray: 77,
	UuidArray: 78,
	UnknownNumber: 128
};
//#endregion
//#region node_modules/@prisma/adapter-better-sqlite3/dist/index.mjs
var E_CANCELED = /* @__PURE__ */ new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var Semaphore = class {
	constructor(_value, _cancelError = E_CANCELED) {
		this._value = _value;
		this._cancelError = _cancelError;
		this._queue = [];
		this._weightedWaiters = [];
	}
	acquire(weight = 1, priority = 0) {
		if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
		return new Promise((resolve, reject) => {
			const task = {
				resolve,
				reject,
				weight,
				priority
			};
			const i = findIndexFromEnd(this._queue, (other) => priority <= other.priority);
			if (i === -1 && weight <= this._value) this._dispatchItem(task);
			else this._queue.splice(i + 1, 0, task);
		});
	}
	runExclusive(callback_1) {
		return __awaiter$2(this, arguments, void 0, function* (callback, weight = 1, priority = 0) {
			const [value, release] = yield this.acquire(weight, priority);
			try {
				return yield callback(value);
			} finally {
				release();
			}
		});
	}
	waitForUnlock(weight = 1, priority = 0) {
		if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
		if (this._couldLockImmediately(weight, priority)) return Promise.resolve();
		else return new Promise((resolve) => {
			if (!this._weightedWaiters[weight - 1]) this._weightedWaiters[weight - 1] = [];
			insertSorted(this._weightedWaiters[weight - 1], {
				resolve,
				priority
			});
		});
	}
	isLocked() {
		return this._value <= 0;
	}
	getValue() {
		return this._value;
	}
	setValue(value) {
		this._value = value;
		this._dispatchQueue();
	}
	release(weight = 1) {
		if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
		this._value += weight;
		this._dispatchQueue();
	}
	cancel() {
		this._queue.forEach((entry) => entry.reject(this._cancelError));
		this._queue = [];
	}
	_dispatchQueue() {
		this._drainUnlockWaiters();
		while (this._queue.length > 0 && this._queue[0].weight <= this._value) {
			this._dispatchItem(this._queue.shift());
			this._drainUnlockWaiters();
		}
	}
	_dispatchItem(item) {
		const previousValue = this._value;
		this._value -= item.weight;
		item.resolve([previousValue, this._newReleaser(item.weight)]);
	}
	_newReleaser(weight) {
		let called = false;
		return () => {
			if (called) return;
			called = true;
			this.release(weight);
		};
	}
	_drainUnlockWaiters() {
		if (this._queue.length === 0) for (let weight = this._value; weight > 0; weight--) {
			const waiters = this._weightedWaiters[weight - 1];
			if (!waiters) continue;
			waiters.forEach((waiter) => waiter.resolve());
			this._weightedWaiters[weight - 1] = [];
		}
		else {
			const queuedPriority = this._queue[0].priority;
			for (let weight = this._value; weight > 0; weight--) {
				const waiters = this._weightedWaiters[weight - 1];
				if (!waiters) continue;
				const i = waiters.findIndex((waiter) => waiter.priority <= queuedPriority);
				(i === -1 ? waiters : waiters.splice(0, i)).forEach((waiter) => waiter.resolve());
			}
		}
	}
	_couldLockImmediately(weight, priority) {
		return (this._queue.length === 0 || this._queue[0].priority < priority) && weight <= this._value;
	}
};
function insertSorted(a, v) {
	const i = findIndexFromEnd(a, (other) => v.priority <= other.priority);
	a.splice(i + 1, 0, v);
}
function findIndexFromEnd(a, predicate) {
	for (let i = a.length - 1; i >= 0; i--) if (predicate(a[i])) return i;
	return -1;
}
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var Mutex = class {
	constructor(cancelError) {
		this._semaphore = new Semaphore(1, cancelError);
	}
	acquire() {
		return __awaiter$1(this, arguments, void 0, function* (priority = 0) {
			const [, releaser] = yield this._semaphore.acquire(1, priority);
			return releaser;
		});
	}
	runExclusive(callback, priority = 0) {
		return this._semaphore.runExclusive(() => callback(), 1, priority);
	}
	isLocked() {
		return this._semaphore.isLocked();
	}
	waitForUnlock(priority = 0) {
		return this._semaphore.waitForUnlock(1, priority);
	}
	release() {
		if (this._semaphore.isLocked()) this._semaphore.release();
	}
	cancel() {
		return this._semaphore.cancel();
	}
};
var name = "@prisma/adapter-better-sqlite3";
var debug = Debug("prisma:driver-adapter:better-sqlite3:conversion");
function mapDeclType(declType) {
	if (declType === null) return null;
	switch (declType.toUpperCase()) {
		case "": return null;
		case "DECIMAL": return ColumnTypeEnum.Numeric;
		case "FLOAT": return ColumnTypeEnum.Float;
		case "DOUBLE":
		case "DOUBLE PRECISION":
		case "NUMERIC":
		case "REAL": return ColumnTypeEnum.Double;
		case "TINYINT":
		case "SMALLINT":
		case "MEDIUMINT":
		case "INT":
		case "INTEGER":
		case "SERIAL":
		case "INT2": return ColumnTypeEnum.Int32;
		case "BIGINT":
		case "UNSIGNED BIG INT":
		case "INT8": return ColumnTypeEnum.Int64;
		case "DATETIME":
		case "TIMESTAMP": return ColumnTypeEnum.DateTime;
		case "TIME": return ColumnTypeEnum.Time;
		case "DATE": return ColumnTypeEnum.Date;
		case "TEXT":
		case "CLOB":
		case "CHARACTER":
		case "VARCHAR":
		case "VARYING CHARACTER":
		case "NCHAR":
		case "NATIVE CHARACTER":
		case "NVARCHAR": return ColumnTypeEnum.Text;
		case "BLOB": return ColumnTypeEnum.Bytes;
		case "BOOLEAN": return ColumnTypeEnum.Boolean;
		case "JSONB": return ColumnTypeEnum.Json;
		default:
			debug("unknown decltype:", declType);
			return null;
	}
}
function mapDeclaredColumnTypes(columnTypes) {
	const emptyIndices = /* @__PURE__ */ new Set();
	return [columnTypes.map((typeName, index) => {
		const mappedType = mapDeclType(typeName);
		if (mappedType === null) emptyIndices.add(index);
		return mappedType;
	}), emptyIndices];
}
function getColumnTypes(declaredTypes, rows) {
	const [columnTypes, emptyIndices] = mapDeclaredColumnTypes(declaredTypes);
	if (emptyIndices.size === 0) return columnTypes;
	columnLoop: for (const columnIndex of emptyIndices) {
		for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
			const candidateValue = rows[rowIndex][columnIndex];
			if (candidateValue !== null) {
				columnTypes[columnIndex] = inferColumnType(candidateValue);
				continue columnLoop;
			}
		}
		columnTypes[columnIndex] = ColumnTypeEnum.Int32;
	}
	return columnTypes;
}
function inferColumnType(value) {
	switch (typeof value) {
		case "string": return ColumnTypeEnum.Text;
		case "bigint": return ColumnTypeEnum.Int64;
		case "boolean": return ColumnTypeEnum.Boolean;
		case "number": return ColumnTypeEnum.UnknownNumber;
		case "object": return inferObjectType(value);
		default: throw new UnexpectedTypeError(value);
	}
}
function inferObjectType(value) {
	if (value instanceof ArrayBuffer) return ColumnTypeEnum.Bytes;
	throw new UnexpectedTypeError(value);
}
var UnexpectedTypeError = class extends Error {
	name = "UnexpectedTypeError";
	constructor(value) {
		const type = typeof value;
		const repr = type === "object" ? JSON.stringify(value) : String(value);
		super(`unexpected value of type ${type}: ${repr}`);
	}
};
function mapRow(row, columnTypes) {
	const result = [];
	for (let i = 0; i < row.length; i++) {
		const value = row[i];
		if (typeof value === "number" && (columnTypes[i] === ColumnTypeEnum.Int32 || columnTypes[i] === ColumnTypeEnum.Int64) && !Number.isInteger(value)) {
			result[i] = Math.trunc(value);
			continue;
		}
		if (["number", "bigint"].includes(typeof value) && columnTypes[i] === ColumnTypeEnum.DateTime) {
			result[i] = new Date(Number(value)).toISOString();
			continue;
		}
		if (typeof value === "bigint") {
			const asNumber = Number(value);
			result[i] = Number.isSafeInteger(asNumber) ? asNumber : value.toString();
			continue;
		}
		result[i] = value;
	}
	return result;
}
function mapArg(arg, argType, options) {
	if (arg === null) return null;
	if (typeof arg === "string" && argType.scalarType === "int") return Number.parseInt(arg);
	if (typeof arg === "string" && argType.scalarType === "float") return Number.parseFloat(arg);
	if (typeof arg === "string" && argType.scalarType === "decimal") return Number.parseFloat(arg);
	if (typeof arg === "string" && argType.scalarType === "bigint") return BigInt(arg);
	if (typeof arg === "boolean") return arg ? 1 : 0;
	if (typeof arg === "string" && argType.scalarType === "datetime") arg = new Date(arg);
	if (arg instanceof Date) {
		const format = options?.timestampFormat ?? "iso8601";
		switch (format) {
			case "unixepoch-ms": return arg.getTime();
			case "iso8601": return arg.toISOString().replace("Z", "+00:00");
			default: throw new Error(`Unknown timestamp format: ${format}`);
		}
	}
	if (typeof arg === "string" && argType.scalarType === "bytes") return Buffer.from(arg, "base64");
	return arg;
}
function convertDriverError(error) {
	if (isDriverError(error)) return {
		originalCode: error.code,
		originalMessage: error.message,
		...mapDriverError(error)
	};
	throw error;
}
function mapDriverError(error) {
	switch (error.code) {
		case "SQLITE_BUSY": return { kind: "SocketTimeout" };
		case "SQLITE_CONSTRAINT_UNIQUE":
		case "SQLITE_CONSTRAINT_PRIMARYKEY": {
			const fields = error.message.split("constraint failed: ").at(1)?.split(", ").map((field) => field.split(".").pop());
			return {
				kind: "UniqueConstraintViolation",
				constraint: fields !== void 0 ? { fields } : void 0
			};
		}
		case "SQLITE_CONSTRAINT_NOTNULL": {
			const fields = error.message.split("constraint failed: ").at(1)?.split(", ").map((field) => field.split(".").pop());
			return {
				kind: "NullConstraintViolation",
				constraint: fields !== void 0 ? { fields } : void 0
			};
		}
		case "SQLITE_CONSTRAINT_FOREIGNKEY":
		case "SQLITE_CONSTRAINT_TRIGGER": return {
			kind: "ForeignKeyConstraintViolation",
			constraint: { foreignKey: {} }
		};
		default:
			if (error.message.startsWith("no such table")) return {
				kind: "TableDoesNotExist",
				table: error.message.split(": ").at(1)
			};
			else if (error.message.startsWith("no such column")) return {
				kind: "ColumnNotFound",
				column: error.message.split(": ").at(1)
			};
			else if (error.message.includes("has no column named ")) return {
				kind: "ColumnNotFound",
				column: error.message.split("has no column named ").at(1)
			};
			throw error;
	}
}
function isDriverError(error) {
	return typeof error.code === "string" && typeof error.message === "string";
}
var debug2 = Debug("prisma:driver-adapter:better-sqlite3");
var BetterSQLite3Queryable = class {
	constructor(client, adapterOptions) {
		this.client = client;
		this.adapterOptions = adapterOptions;
	}
	provider = "sqlite";
	adapterName = name;
	/**
	* Execute a query given as SQL, interpolating the given parameters.
	*/
	async queryRaw(query) {
		debug2(`[js::queryRaw] %O`, query);
		const { columnNames, declaredTypes, values } = await this.performIO(query);
		const rows = values;
		const columnTypes = getColumnTypes(declaredTypes, rows);
		return {
			columnNames,
			columnTypes,
			rows: rows.map((row) => mapRow(row, columnTypes))
		};
	}
	/**
	* Execute a query given as SQL, interpolating the given parameters and
	* returning the number of affected rows.
	* Note: Queryable expects a u64, but napi.rs only supports u32.
	*/
	async executeRaw(query) {
		debug2(`[js::executeRaw] %O`, query);
		return (await this.executeIO(query)).changes;
	}
	/**
	* Run a query against the database, returning the result set.
	* Should the query fail due to a connection error, the connection is
	* marked as unhealthy.
	*/
	executeIO(query) {
		try {
			const args = query.args.map((arg, i) => mapArg(arg, query.argTypes[i], this.adapterOptions));
			const result = this.client.prepare(query.sql).bind(args).run();
			return Promise.resolve(result);
		} catch (e) {
			this.onError(e);
		}
	}
	/**
	* Run a query against the database, returning the result set.
	* Should the query fail due to a connection error, the connection is
	* marked as unhealthy.
	*/
	performIO(query) {
		try {
			const args = query.args.map((arg, i) => mapArg(arg, query.argTypes[i], this.adapterOptions));
			const stmt = this.client.prepare(query.sql).bind(args);
			if (!stmt.reader) {
				stmt.run();
				return Promise.resolve({
					columnNames: [],
					declaredTypes: [],
					values: []
				});
			}
			const columns = stmt.columns();
			const resultSet = {
				declaredTypes: columns.map((column) => column.type),
				columnNames: columns.map((column) => column.name),
				values: stmt.raw().all()
			};
			return Promise.resolve(resultSet);
		} catch (e) {
			this.onError(e);
		}
	}
	onError(error) {
		debug2("Error in performIO: %O", error);
		throw new DriverAdapterError(convertDriverError(error));
	}
};
var BetterSQLite3Transaction = class extends BetterSQLite3Queryable {
	constructor(client, options, adapterOptions, unlockParent) {
		super(client, adapterOptions);
		this.options = options;
		this.#unlockParent = unlockParent;
	}
	#unlockParent;
	commit() {
		debug2(`[js::commit]`);
		this.#unlockParent();
		return Promise.resolve();
	}
	rollback() {
		debug2(`[js::rollback]`);
		this.#unlockParent();
		return Promise.resolve();
	}
	async createSavepoint(name2) {
		await this.executeRaw({
			sql: `SAVEPOINT ${name2}`,
			args: [],
			argTypes: []
		});
	}
	async rollbackToSavepoint(name2) {
		await this.executeRaw({
			sql: `ROLLBACK TO ${name2}`,
			args: [],
			argTypes: []
		});
	}
	async releaseSavepoint(name2) {
		await this.executeRaw({
			sql: `RELEASE SAVEPOINT ${name2}`,
			args: [],
			argTypes: []
		});
	}
};
var PrismaBetterSqlite3Adapter = class extends BetterSQLite3Queryable {
	#mutex = new Mutex();
	constructor(client, adapterOptions) {
		super(client, adapterOptions);
	}
	executeScript(script) {
		try {
			this.client.exec(script);
		} catch (e) {
			this.onError(e);
		}
		return Promise.resolve();
	}
	async startTransaction(isolationLevel) {
		if (isolationLevel && isolationLevel !== "SERIALIZABLE") throw new DriverAdapterError({
			kind: "InvalidIsolationLevel",
			level: isolationLevel
		});
		const options = { usePhantomQuery: false };
		debug2("%s options: %O", "[js::startTransaction]", options);
		try {
			const release = await this.#mutex.acquire();
			this.client.prepare("BEGIN").run();
			return new BetterSQLite3Transaction(this.client, options, this.adapterOptions, release);
		} catch (e) {
			this.onError(e);
		}
	}
	dispose() {
		this.client.close();
		return Promise.resolve();
	}
};
var PrismaBetterSqlite3AdapterFactory = class {
	provider = "sqlite";
	adapterName = name;
	#config;
	#options;
	constructor(config, options) {
		this.#config = config;
		this.#options = options;
	}
	connect() {
		return Promise.resolve(new PrismaBetterSqlite3Adapter(createBetterSQLite3Client(this.#config), this.#options));
	}
	connectToShadowDb() {
		const url = this.#options?.shadowDatabaseUrl ?? ":memory:";
		return Promise.resolve(new PrismaBetterSqlite3Adapter(createBetterSQLite3Client({
			...this.#config,
			url
		}), this.#options));
	}
};
function createBetterSQLite3Client(input) {
	const { url, ...config } = input;
	const dbPath = url.replace(/^file:/, "");
	const db = new Database(dbPath, config);
	db.defaultSafeIntegers(true);
	return db;
}
//#endregion
//#region generated/prisma/internal/class.ts
var config = {
	"previewFeatures": [],
	"clientVersion": "7.9.1",
	"engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
	"activeProvider": "sqlite",
	"inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"sqlite\"\n}\n\nmodel Campaign {\n  id            Int      @id @default(autoincrement())\n  name          String   @default(\"Campaign Name\")\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n  daysPast      Int      @default(0)\n  isActive      Boolean  @default(false)\n  optionsConfig String?\n}\n",
	"runtimeDataModel": {
		"models": {},
		"enums": {},
		"types": {}
	},
	"parameterizationSchema": {
		"strings": [],
		"graph": ""
	}
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Campaign\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"daysPast\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"optionsConfig\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
	strings: JSON.parse("[\"where\",\"Campaign.findUnique\",\"Campaign.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Campaign.findFirst\",\"Campaign.findFirstOrThrow\",\"Campaign.findMany\",\"data\",\"Campaign.createOne\",\"Campaign.createMany\",\"Campaign.createManyAndReturn\",\"Campaign.updateOne\",\"Campaign.updateMany\",\"Campaign.updateManyAndReturn\",\"create\",\"update\",\"Campaign.upsertOne\",\"Campaign.deleteOne\",\"Campaign.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Campaign.groupBy\",\"Campaign.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"name\",\"createdAt\",\"updatedAt\",\"daysPast\",\"isActive\",\"optionsConfig\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"not\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
	graph: "PAsQChwAACwAMB0AAAQAEB4AACwAMB8CAAAAASABAC4AISFAAC8AISJAAC8AISMCAC0AISQgADAAISUBADEAIQEAAAABACABAAAAAQAgChwAACwAMB0AAAQAEB4AACwAMB8CAC0AISABAC4AISFAAC8AISJAAC8AISMCAC0AISQgADAAISUBADEAIQElAAAyACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAHHwIAAAABIAEAAAABIUAAAAABIkAAAAABIwIAAAABJCAAAAABJQEAAAABAQgAAAkAIAcfAgAAAAEgAQAAAAEhQAAAAAEiQAAAAAEjAgAAAAEkIAAAAAElAQAAAAEBCAAACwAwAQgAAAsAMAcfAgA6ACEgAQA4ACEhQAA5ACEiQAA5ACEjAgA6ACEkIAA7ACElAQA8ACECAAAAAQAgCAAADgAgBx8CADoAISABADgAISFAADkAISJAADkAISMCADoAISQgADsAISUBADwAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBhUAADMAIBYAADQAIBcAADcAIBgAADYAIBkAADUAICUAADIAIAocAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhQAAdACEiQAAdACEjAgAbACEkIAAeACElAQAfACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAocAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhQAAdACEiQAAdACEjAgAbACEkIAAeACElAQAfACENFQAAJAAgFgAAKwAgFwAAJAAgGAAAJAAgGQAAJAAgJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABMAIAKgAhDhUAACQAIBgAACkAIBkAACkAICYBAAAAAScBAAAABCgBAAAABCkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACgAIQsVAAAkACAYAAAnACAZAAAnACAmQAAAAAEnQAAAAAQoQAAAAAQpQAAAAAEqQAAAAAErQAAAAAEsQAAAAAEwQAAmACEFFQAAJAAgGAAAJQAgGQAAJQAgJiAAAAABMCAAIwAhDhUAACEAIBgAACIAIBkAACIAICYBAAAAAScBAAAABSgBAAAABSkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACAAIQ4VAAAhACAYAAAiACAZAAAiACAmAQAAAAEnAQAAAAUoAQAAAAUpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAAAAEuAQAAAAEvAQAAAAEwAQAgACEIJgIAAAABJwIAAAAFKAIAAAAFKQIAAAABKgIAAAABKwIAAAABLAIAAAABMAIAIQAhCyYBAAAAAScBAAAABSgBAAAABSkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACIAIQUVAAAkACAYAAAlACAZAAAlACAmIAAAAAEwIAAjACEIJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABMAIAJAAhAiYgAAAAATAgACUAIQsVAAAkACAYAAAnACAZAAAnACAmQAAAAAEnQAAAAAQoQAAAAAQpQAAAAAEqQAAAAAErQAAAAAEsQAAAAAEwQAAmACEIJkAAAAABJ0AAAAAEKEAAAAAEKUAAAAABKkAAAAABK0AAAAABLEAAAAABMEAAJwAhDhUAACQAIBgAACkAIBkAACkAICYBAAAAAScBAAAABCgBAAAABCkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACgAIQsmAQAAAAEnAQAAAAQoAQAAAAQpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAAAAEuAQAAAAEvAQAAAAEwAQApACENFQAAJAAgFgAAKwAgFwAAJAAgGAAAJAAgGQAAJAAgJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABMAIAKgAhCCYIAAAAAScIAAAABCgIAAAABCkIAAAAASoIAAAAASsIAAAAASwIAAAAATAIACsAIQocAAAsADAdAAAEABAeAAAsADAfAgAtACEgAQAuACEhQAAvACEiQAAvACEjAgAtACEkIAAwACElAQAxACEIJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABMAIAJAAhCyYBAAAAAScBAAAABCgBAAAABCkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACkAIQgmQAAAAAEnQAAAAAQoQAAAAAQpQAAAAAEqQAAAAAErQAAAAAEsQAAAAAEwQAAnACECJiAAAAABMCAAJQAhCyYBAAAAAScBAAAABSgBAAAABSkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACIAIQAAAAAAAAExAQAAAAEBMUAAAAABBTECAAAAATICAAAAATMCAAAAATQCAAAAATUCAAAAAQExIAAAAAEBMQEAAAABAAAAAAUVAAYWAAcXAAgYAAkZAAoAAAAAAAUVAAYWAAcXAAgYAAkZAAoBAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIaGAUbGQs"
};
async function decodeBase64AsWasm(wasmBase64) {
	const { Buffer } = await import("node:buffer");
	const wasmArray = Buffer.from(wasmBase64, "base64");
	return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
	getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.mjs"),
	getQueryCompilerWasmModule: async () => {
		const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.wasm-base64.mjs");
		return await decodeBase64AsWasm(wasm);
	},
	importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
	return runtime.getPrismaClient(config);
}
runtime.Extensions.getExtensionContext;
runtime.NullTypes.DbNull, runtime.NullTypes.JsonNull, runtime.NullTypes.AnyNull;
runtime.makeStrictEnum({ Serializable: "Serializable" });
runtime.Extensions.defineExtension;
//#endregion
//#region generated/prisma/client.ts
globalThis["__dirname"] = path$1.dirname(fileURLToPath(import.meta.url));
/**
* ## Prisma Client
* 
* Type-safe database client for TypeScript
* @example
* ```
* const prisma = new PrismaClient({
*   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
* })
* // Fetch zero or more Campaigns
* const campaigns = await prisma.campaign.findMany()
* ```
* 
* Read more in our [docs](https://pris.ly/d/client).
*/
var PrismaClient = getPrismaClientClass();
//#endregion
//#region electron/db/prisma.ts
var prisma = null;
function getPrisma() {
	if (prisma) return prisma;
	prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3AdapterFactory({ url: `file:${(!app.isPackaged ? path.join(process.cwd(), "prisma", "dev.db") : path.join(app.getPath("userData"), "campaign-dater.sqlite")).replace(/\\/g, "/")}` }) });
	return prisma;
}
//#endregion
//#region src/config/defaultDateData.config.ts
var defaultDateConfig = {
	startDay: {
		monthNumber: 10,
		dayNumber: 1,
		year: 845
	},
	daysOfTheWeek: [
		"Morndar",
		"Tirdar",
		"Middar",
		"Lurdar",
		"Fredar",
		"Soredar",
		"Sundar"
	],
	months: [
		{
			monthNumber: 1,
			monthName: "Mraznik",
			days: 30
		},
		{
			monthNumber: 2,
			monthName: "Volčnik",
			days: 30
		},
		{
			monthNumber: 3,
			monthName: "Talnik",
			days: 31
		},
		{
			monthNumber: 4,
			monthName: "Setven",
			days: 30
		},
		{
			monthNumber: 5,
			monthName: "Cvetnik",
			days: 30
		},
		{
			monthNumber: 6,
			monthName: "Travnik",
			days: 31
		},
		{
			monthNumber: 7,
			monthName: "Žarnik",
			days: 30
		},
		{
			monthNumber: 8,
			monthName: "Žetven",
			days: 30
		},
		{
			monthNumber: 9,
			monthName: "Sadnik",
			days: 31
		},
		{
			monthNumber: 10,
			monthName: "Listopad",
			days: 30
		},
		{
			monthNumber: 11,
			monthName: "Meglen",
			days: 30
		},
		{
			monthNumber: 12,
			monthName: "Mraknik",
			days: 31
		}
	]
};
//#endregion
//#region electron/campaignDays.ipc.ts
function registerCampaignDaysIpc() {
	ipcMain.handle("campaignDays:list", async () => {
		return (await getPrisma().campaign.findMany({ orderBy: { createdAt: "desc" } })).map((row) => ({ ...row }));
	});
	ipcMain.handle("campaignDays:create", async (_, name) => {
		const campaignName = await getPrisma().campaign.create({ data: { name } });
		return {
			...campaignName,
			optionsConfig: JSON.stringify(defaultDateConfig),
			createdAt: campaignName.createdAt.toISOString(),
			updatedAt: campaignName.updatedAt.toISOString()
		};
	});
	ipcMain.handle("campaignDays:active", async (_, id) => {
		const prisma = getPrisma();
		await prisma.campaign.updateMany({ data: { isActive: false } });
		return { ...await prisma.campaign.update({
			where: { id },
			data: { isActive: true }
		}) };
	});
	ipcMain.handle("campaignDays:delete", async (_, id) => {
		await getPrisma().campaign.delete({ where: { id } });
		return { id };
	});
	ipcMain.handle("campaignDays:increase", async (_, id) => {
		return (await getPrisma().campaign.update({
			where: { id },
			data: { daysPast: { increment: 1 } },
			select: { daysPast: true }
		})).daysPast;
	});
	ipcMain.handle("campaignDays:decrease", async (_, id) => {
		return (await getPrisma().campaign.update({
			where: { id },
			data: { daysPast: { decrement: 1 } },
			select: { daysPast: true }
		})).daysPast;
	});
}
//#endregion
//#region electron/index.ts
function registerIpc() {
	registerCampaignDaysIpc();
}
//#endregion
//#region electron/main.ts
createRequire(import.meta.url);
var __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
var VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
var MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
var RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
var win;
var dbPath = path.join(process.env.APP_ROOT, "prisma", "dev.db");
process.env.DATABASE_URL = pathToFileURL(dbPath).href.replace("file:///", "file:");
console.log("DATABASE_URL =", process.env.DATABASE_URL);
function createWindow() {
	win = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: { preload: path.join(__dirname, "preload.mjs") }
	});
	if (!app.isPackaged) win.webContents.openDevTools({ mode: "detach" });
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
	});
	if (VITE_DEV_SERVER_URL) win.loadURL(VITE_DEV_SERVER_URL);
	else win.loadFile(path.join(RENDERER_DIST, "index.html"));
}
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.whenReady().then(createWindow);
registerIpc();
//#endregion
export { MAIN_DIST, RENDERER_DIST, VITE_DEV_SERVER_URL };
