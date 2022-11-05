import React, { useState } from "react";
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

const AppSectionsSidebar = () => {
	const appSections: AppSection[] = [
		new AppSection({
			title: "Home",
			icon: "f7:house_fill",
			url: "/",
		}),
		new AppSection({
			title: "Quests",
			subtitle: "Create & Manage Quests",
			icon: "f7:question_circle",
			url: "/quests/",
		}),
		new AppSection({
			title: "Localization",
			subtitle: "Multiple Countries at Once",
			icon: "material:translate",
			url: "/localization/",
		}),
		new AppSection({
			title: "Settings",
			subtitle: "When in doubt, pinky out",
			icon: "f7:gear_alt_fill",
			url: "/settings/",
		}),
	];

	const [selectedAppSection, setSelectedAppSection] = useState(
		appSections[0].slug
	);

	return (
		<Panel id="appsections" left cover>
			<View>
				<Page>
					<Navbar title={Globals.APP_NAME} />
					{/* <Block>Right panel content goes here</Block> */}

					<List menuList mediaList inset>
						{appSections.map((section) => (
							<ListItem
								link="/quests/"
								view=".view-main"
								title={section.title}
								subtitle={section.subtitle}
								selected={selectedAppSection === section.slug}
								onClick={() =>
									setSelectedAppSection(section.slug)
								}
							>
								{/* {SectionIcon(section.icon)} */}
								{section.RenderIcon()}
							</ListItem>
						))}
					</List>
				</Page>
			</View>
		</Panel>
	);
};

export default AppSectionsSidebar;
