import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import {
	fileOpen,
	directoryOpen,
	fileSave,
	supported,
} from "https://unpkg.com/browser-fs-access";
import AppSection from "../models/AppSection";
import Globals from "../js/globals";
import BraveApp from "./app";

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

const SaveFileToLocationDialog = () => {
	const [loadedSaveDirectory, setLoadedSaveDirectory] = useState(undefined);

	async function saveDataFromStore() {
		f7.preloader.show();

		await utils.saveToFileAsJson(
			new QuestSaveData({
				lastModified: Date.now(),
				quests: store.getters.quests.value,
			})
		);

		setTimeout(() => {
			// store.dispatch("loadQuests", {
			// 	file: loadedFile,
			// });

			f7.preloader.hide();
			f7.popup.close();
		}, 1000);
	}

	return (
		<Popup
			id={`save-to-directory-popup`}
			onPopupOpen={async (e) => {
				if (supported) {
					console.log("Using the File System Access API.");
				} else {
					console.log("Using the fallback implementation.");
				}
			}}
		>
			<View>
				<Page>
					<Navbar>
						<NavLeft>
							<Link popupClose>Close</Link>
						</NavLeft>
						<NavTitle>Save to Directory</NavTitle>
						<NavRight>
							<Link
								style={{
									display:
										loadedSaveDirectory != "" &&
										loadedSaveDirectory != undefined
											? "block"
											: "none",
								}}
								onClick={saveDataFromStore}
							>
								Save
							</Link>
						</NavRight>
					</Navbar>
					<List noHairlinesMd inset>
						<ListInput
							label="Name"
							type="text"
							value="quests.json"
							readonly
							disabled
						/>
						<ListInput
							label="Number of Quests"
							type="text"
							value={utils.pluralize(
								store.getters.quests.value,
								"Quest",
								"Quests"
							)}
							readonly
							disabled
						/>
					</List>
					<List noHairlinesMd inset>
						<ListButton
							onClick={async () => await saveDataFromStore()}
						>
							Choose Directory
						</ListButton>
					</List>
				</Page>
			</View>
		</Popup>
	);
};

export default SaveFileToLocationDialog;
