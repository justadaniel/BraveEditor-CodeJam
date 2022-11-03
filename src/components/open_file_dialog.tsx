import React, {
	useState,
	window,
	FileHandle,
	FileSystem,
	FileReader,
} from "react";
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

const OpenFileLocationDialog = (guid: string) => {
	const [fileLocation, setFileLocation] = useState("");

	async function simulateFileLoading() {
		f7.preloader.show();

		setTimeout(() => {
			store.dispatch("loadQuests", {
				filePath: fileLocation,
			});
			f7.preloader.hide();
			f7.popup.close();
		}, 1000);
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
										fileLocation != "" &&
										fileLocation != undefined
											? "block"
											: "none",
								}}
								onClick={simulateFileLoading}
							>
								Open
							</Link>
						</NavRight>
					</Navbar>
					<List noHairlinesMd inset>
						<ListInput
							label="File Location"
							type="text"
							placeholder="C:/Meh/Path/Data/quests.json"
							value={fileLocation}
							readonly
							disabled
						/>
						<ListInput
							label="File Input"
							id="fileinput"
							type="file"
							placeholder="C:/Meh/Path/Data/quests.json"
							accept=".json"
							style={{ display: "none" }}
							onChange={(e) => {
								var chosenFilePath = e.target.value;
								if (
									chosenFilePath == "" ||
									chosenFilePath == undefined
								)
									return;

								console.log(chosenFilePath);
								setFileLocation(chosenFilePath);
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
