import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import AppSection from "../models/appsection";
import Globals from "../js/globals";
import BraveApp from "../components/app";

import {
	f7,
	f7ready,
	App,
	Panel,
	Views,
	View,
	Popup,
	Page,
	Toolbar,
	Icon,
	Navbar,
	NavTitle,
	NavTitleLarge,
	NavLeft,
	NavRight,
	Link,
	Block,
	BlockTitle,
	LoginScreen,
	LoginScreenTitle,
	List,
	ListItem,
	ListInput,
	ListButton,
	BlockFooter,
} from "framework7-react";
import utils from "../js/utils";

import store from "../js/store";
import { Quest } from "../models/Quest";
import { IQuestSaveData, QuestSaveData } from "../models/QuestSaveData";

const OpenFileLocationDialog = (guid: string) => {
	const [loadedFile, setLoadedFile] = useState(undefined);
	const [loadedSaveData, setLoadedSaveData] = useState(undefined);

	async function storeFileInMemory(file: File) {
		if (file == undefined) return;

		var saveData: IQuestSaveData =
			await utils.loadJsonFromFile<IQuestSaveData>(file);

		if (saveData == undefined) {
			return;
		}

		setLoadedFile(file);
		setLoadedSaveData(saveData);
		console.log(file);
		// console.log(questData);
	}

	async function loadDataIntoStore() {
		f7.preloader.show();

		setTimeout(() => {
			store.dispatch("loadQuests", {
				file: loadedFile,
			});
			f7.preloader.hide();
			f7.popup.close();
		}, 1000);
	}

	function getFileName(): string {
		if (loadedFile != undefined) return loadedFile.name;
		else return "";
	}

	function getFileSize(): string {
		if (loadedFile != undefined) return `${loadedFile.size} bytes`;
		else return "";
	}

	function getLastFileModifiedDate(): string {
		if (loadedFile != undefined)
			return utils.numberToModifiedDateString(loadedFile.lastModified);
		else return "";
	}

	function getFileQuestsCount(): string {
		var saveData: IQuestSaveData = loadedSaveData as IQuestSaveData;
		if (saveData != undefined) {
			console.log(saveData);
			return utils.pluralize(saveData.quests, "Quest", "Quests");
		} else return "";
	}

	return (
		<Popup id={`choose-file-popup_${guid}`}>
			<View>
				<Page>
					<Navbar>
						<NavLeft>
							<Link popupClose>Close</Link>
						</NavLeft>
						<NavTitle>Open File</NavTitle>
						<NavRight>
							<Link
								style={{
									display:
										loadedFile != "" &&
										loadedFile != undefined
											? "block"
											: "none",
								}}
								onClick={loadDataIntoStore}
							>
								Open
							</Link>
						</NavRight>
					</Navbar>
					<List noHairlinesMd inset>
						<ListInput
							label="Name"
							type="text"
							value={getFileName()}
							readonly
							disabled
						/>
						<ListInput
							label="Size"
							type="text"
							value={getFileSize()}
							readonly
							disabled
						/>
						<ListInput
							label="Last Modified"
							type="text"
							value={getLastFileModifiedDate()}
							readonly
							disabled
						/>
						<ListInput
							label="Number of Quests"
							type="text"
							value={getFileQuestsCount()}
							readonly
							disabled
						/>
						<ListInput
							label="File Input"
							id="fileinput"
							type="file"
							accept=".json"
							style={{ display: "none" }}
							onChange={async (e) => {
								var file: File = await utils.loadFileFromPicker(
									e
								);
								storeFileInMemory(file);
							}}
						/>
					</List>
					<List noHairlinesMd inset>
						<ListButton
							onClick={async () => {
								f7.$(
									`#choose-file-popup_${guid} #fileinput input[type="file"]`
								).click();
							}}
						>
							Choose File
						</ListButton>
					</List>
				</Page>
			</View>
		</Popup>
	);
};

export default OpenFileLocationDialog;
