import React, { useState, mouseClickEvents } from "react";
import {
	fileOpen,
	directoryOpen,
	fileSave,
	supported,
} from "https://unpkg.com/browser-fs-access";
import {
	Page,
	Navbar,
	List,
	ListInput,
	ListItem,
	Toggle,
	BlockTitle,
	Row,
	Button,
	Range,
	Block,
	f7,
} from "framework7-react";
import { loadConfigFromFile } from "vite";
import { Quest } from "../models/Quest";
const mouseClickEvents = ["mousedown", "click", "mouseup"];

const utils = {
	async copyTextToClipboard(value: any, name: string) {
		navigator.clipboard.writeText(value).then(
			() => {
				/* clipboard successfully set */

				var toastBottom = f7.toast.create({
					text: `\"${name}\" copied to clipboard.`,
					closeTimeout: 2000,
				});
				toastBottom.open();
			},
			() => {
				/* clipboard write failed */
			}
		);
	},
	formatBytes(bytes, decimals = 2): string {
		if (!+bytes) return "0 Bytes";

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
			sizes[i]
		}`;
	},
	sanitizeImportantString(value): string {
		return value
			.toLowerCase()
			.replace(/[.,\/#!$%\^&\*;:{}=\`~()']/g, "")
			.replaceAll(" ", "-")
			.replaceAll("_", "-")
			.replaceAll("--", "-");
		// .replaceAll("/", "")
		// .replaceAll("\\", "");
	},
	replaceTokenInStringWithValue(
		searchString: string,
		tokenKey: string,
		value: any
	): string {
		return searchString.replace(`{${tokenKey}}`, value);
	},
	replaceTokenInStringWithArrayLength(
		searchString: string,
		tokenKey: string,
		array: any[]
	): string {
		let arrayLength: number = 0;

		if (array != undefined) arrayLength = array.length;

		return searchString.replace(`{${tokenKey}}`, arrayLength.toString());
	},
	pluralizeNumber(value: number, singular: string, plural: string): string {
		if (value == 1) return singular;
		else return plural;
	},
	pluralize(
		value: any[],
		singular: string,
		plural: string,
		format: string = "{value} {plural}"
	): string {
		if (value == undefined)
			return utils.replaceTokenInStringWithValue(
				utils.replaceTokenInStringWithValue(format, "value", 0),
				"plural",
				plural
			);
		else if (value.length == 1)
			return utils.replaceTokenInStringWithValue(
				utils.replaceTokenInStringWithValue(
					format,
					"value",
					value.length
				),
				"plural",
				singular
			);
		else
			return utils.replaceTokenInStringWithValue(
				utils.replaceTokenInStringWithValue(
					format,
					"value",
					value.length
				),
				"plural",
				plural
			);
	},
	numberToModifiedDateString(modifiedDate: number): string {
		if (modifiedDate == undefined) return "Not Modified";
		return new Date(modifiedDate).toLocaleString("en-US", {
			dateStyle: "medium",
			timeStyle: "short",
		});
	},
	openChooseFileDialog(): void {
		f7.popup.open(`#choose-file-popup`);
	},
	openSaveToDirectoryDialog(): void {
		f7.popup.open(`#save-to-directory-popup`);
	},
	simulateMouseClickForElement(element: Element) {
		mouseClickEvents.forEach((mouseEventType) =>
			element.dispatchEvent(
				new MouseEvent(mouseEventType, {
					view: window,
					bubbles: true,
					cancelable: true,
					buttons: 1,
				})
			)
		);
	},
	async loadFilesFromPicker(e: any): Promise<FileList> {
		const fileList: FileList = e.target.files;
		if (fileList == undefined || fileList.length == 0) return;
		return fileList;
	},
	async loadFileFromPicker(e: any): Promise<File> {
		const fileList: FileList = await this.loadFilesFromPicker(e);

		if (fileList == undefined || fileList.length == 0) return;

		const chosenFile: File = fileList[0];

		return chosenFile;
	},
	async loadFileContentsFromPicker(e: any): Promise<string> {
		const file: File = await this.loadFileFromPicker(e);
		return file.text();
	},
	async loadJsonFileFromPicker<Type>(e: any): Promise<Type> {
		const contents: string = await this.loadFileContentsFromPicker(e);
		const json: Type = JSON.parse(contents);
		return json as Type;
	},
	async saveToFile(path: string, data: any) {},
	async loadJsonFromFile<Type>(file: File): Promise<Type> {
		const content = await file.text();
		const json: Type = JSON.parse(content);
		return json as Type;
	},
	async saveToFileAsJson(data: any) {
		// data.lastModified = Date.now();
		console.log(`Current Time: ${Date.now()}`);
		var json = JSON.stringify(data);

		const blob = new Blob([json], {
			type: "application/json",
		});

		var meh = await fileSave(blob, {
			fileName: "quests.json",
		});
		console.log(meh);
	},
};
export default utils;
