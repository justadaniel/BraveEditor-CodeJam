import React, { useState, useEffect } from "react";
import AppSection from "../models/appsection";
import Globals from "../js/globals";
import BraveApp from "./app";
import { Quest, QuestStep } from "../models/quest";
import store from "../js/store";

import {
	f7,
	f7ready,
	useStore,
	Block,
	BlockTitle,
	BlockFooter,
	BlockHeader,
	List,
	ListItem,
	ListButton,
	Page,
	Link,
	Icon,
	Navbar,
	NavLeft,
	NavRight,
	NavTitle,
	NavTitleLarge,
	Preloader,
	Button,
} from "framework7-react";
import utils from "../js/utils";

const QuestsList = () => {
	const RECENTS_COUNT: number = 1;
	const USE_TIMEBASED_SPLIT_LISTS: boolean = false;

	var quests: Quest[] = useStore(store, "quests");
	var isLoading: boolean = useStore(store, "isLoading");
	var hasFileLoaded: boolean = useStore(store, "hasFileLoaded");
	var currentlyAccessedFilePath: string = useStore(
		store,
		"currentlyAccessedFilePath"
	);

	function getQuestsFromRange(startIndex: number, count: number): Quest[] {
		var questsToReturn: Quest[] = [];
		for (let i = startIndex; i < count; i++) {
			const element = quests[i];
			questsToReturn.push(element);
		}
		return questsToReturn;
	}

	function getRecentlyEditedQuests(): Quest[] {
		// return quests;
		// return store.getters.quests(0, 1);
		return getQuestsFromRange(0, RECENTS_COUNT);
	}
	function getFurtherBackQuests(): Quest[] {
		// return quests;
		// return store.getters.quests(0, 1);
		return getQuestsFromRange(RECENTS_COUNT, quests.length);
	}

	const [selectedQuest, setSelectedQuest] = useState("");

	function getQuestDetailsPageLink(quest: Quest): string {
		return `/quest/${quest.guid}/`;
	}

	function addNewQuest() {
		f7.dialog.alert("Not Implemented Yet");
	}

	function getQuestList() {
		if (quests == undefined || quests.length == 0) {
			if (isLoading)
				return (
					<Block className="centered empty-list-text">
						Loading Quests...
					</Block>
				);
			else
				return (
					<div>
						<Block
							strong
							inset
							className="centered empty-list-text"
						>
							<p>No Quests Found</p>
							<Button
								onClick={() =>
									utils.openChooseFileDialog(
										Globals.FILE_UPLOAD_GUID
									)
								}
							>
								Open Quests File
							</Button>
						</Block>
					</div>
				);
		} else if (quests.length >= 2 && USE_TIMEBASED_SPLIT_LISTS) {
			return (
				<div>
					<BlockTitle>Recently Modified</BlockTitle>
					<List menuList mediaList inset>
						{getRecentlyEditedQuests().map((q) => (
							<ListItem
								link={getQuestDetailsPageLink(q)}
								key={q.guid}
								view=".view-main"
								panelClose
								title={q.title}
								subtitle={q.getLastModifiedDateString()}
								text={q.description}
								after={q.getStepsCountText()}
								selected={selectedQuest === q.slug}
								onClick={() => setSelectedQuest(q.slug)}
							></ListItem>
						))}
					</List>
					<BlockTitle>Further Back</BlockTitle>
					<List menuList mediaList inset>
						{getFurtherBackQuests().map((q) => (
							<ListItem
								link={getQuestDetailsPageLink(q)}
								key={q.guid}
								view=".view-main"
								panelClose
								title={q.title}
								subtitle={q.getLastModifiedDateString()}
								text={q.description}
								after={q.getStepsCountText()}
								selected={selectedQuest === q.slug}
								onClick={() => setSelectedQuest(q.slug)}
							></ListItem>
						))}
					</List>
				</div>
			);
		} else {
			return (
				<List menuList mediaList contactsList>
					{quests.map((q) => (
						<ListItem
							link={getQuestDetailsPageLink(q)}
							key={q.guid}
							view=".view-main"
							panelClose
							title={q.title}
							subtitle={q.getLastModifiedDateString()}
							text={q.description}
							after={q.getStepsCountText()}
							selected={selectedQuest === q.slug}
							onClick={() => setSelectedQuest(q.slug)}
						></ListItem>
					))}
				</List>
			);
		}
	}

	function questListFooter() {
		if (isLoading == false && hasFileLoaded)
			return (
				<Block className="footer centered">
					<p>Showing {quests.length} Quests Found</p>
					<p>
						Loaded From
						<span>
							<i> {currentlyAccessedFilePath}</i>
						</span>
					</p>
				</Block>
			);
	}

	function questTitle() {
		if (isLoading == false && hasFileLoaded) {
			return `Quests (${quests.length})`;
		} else return "Quests";
	}

	return (
		<Page>
			<Navbar large>
				<NavLeft>
					<Link
						iconF7="line_horizontal_3"
						iconMD="menu"
						panelOpen="#appsections"
					></Link>
				</NavLeft>
				<NavTitle>{questTitle()}</NavTitle>
				<NavTitleLarge>{questTitle()}</NavTitleLarge>
				<NavRight>
					<Preloader
						style={{
							display: isLoading ? "block" : "none",
						}}
					/>
					<Link
						// onClick={addNewQuest}
						data-tooltip="Not Implemented Yet"
						className={
							isLoading || !hasFileLoaded
								? "disabled tooltip-init"
								: "tooltip-init"
						}
						style={{
							display: !isLoading ? "block" : "none",
						}}
					>
						<Icon
							ios="material:add_circle"
							android="material:add_circle"
							aurora="material:add_circle"
							className="tooltip-init"
						/>
					</Link>
				</NavRight>
			</Navbar>

			{getQuestList()}
			{questListFooter()}
		</Page>
	);
};

export default QuestsList;
