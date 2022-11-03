import React, { useState, useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
import { f7, f7ready, App, Panel, View } from "framework7-react";
import cordovaApp from "../js/cordova-app";

import routes from "../js/routes";
import store from "../js/store";

import Globals from "../js/globals";
import AppSectionsSidebar from "./app_sections_sidebar";
import QuestsList from "./quests_list_page";
import NotFoundPage from "../pages/404";
import OpenFileLocationDialog from "./open_file_dialog";

const BraveApp = () => {
	// Login screen demo data
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const device = getDevice();

	// Framework7 Parameters
	const f7params = {
		name: Globals.APP_NAME, // App name
		theme: Globals.APP_THEME, // Automatic theme detection
		id: "com.braveworld.BraveEditor", // App bundle ID
		// App store
		store: store,
		// App routes
		routes: routes,

		// Input settings
		input: {
			scrollIntoViewOnFocus: device.cordova && !device.electron,
			scrollIntoViewCentered: device.cordova && !device.electron,
		},
		// Cordova Statusbar settings
		statusbar: {
			iosOverlaysWebView: true,
			androidOverlaysWebView: false,
		},
	};
	const alertLoginData = () => {
		f7.dialog.alert(
			"Username: " + username + "<br>Password: " + password,
			() => {
				f7.loginScreen.close();
			}
		);
	};

	const openIndicator = () => {
		f7.preloader.show();
		setTimeout(() => {
			f7.preloader.hide();
		}, 2000);
	};

	f7ready(() => {
		// Init cordova APIs (see cordova-app.js)
		if (f7.device.cordova) {
			cordovaApp.init(f7);
		}

		// if (store.getters.isLoading()) openIndicator();
		// openIndicator();

		// Call F7 APIs here
	});

	return (
		<App {...f7params} dark>
			{/* Right panel with reveal effect*/}
			{AppSectionsSidebar()}

			{/* Left panel with cover effect when hidden */}
			<Panel class="master" left cover resizable visibleBreakpoint={960}>
				<View>{QuestsList()}</View>
			</Panel>

			{/* Your main view, should have "view-main" class */}
			<View main className="safe-areas" url="/" />

			{/* Popup */}
			{OpenFileLocationDialog(Globals.FILE_UPLOAD_GUID)}
		</App>
	);
};

export default BraveApp;
