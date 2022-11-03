import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import {
	f7,
	f7ready,
	Page,
	Navbar,
	NavRight,
	Icon,
	List,
	ListInput,
	ListItem,
	ListButton,
	Toggle,
	BlockTitle,
	Row,
	Col,
	Button,
	Range,
	Block,
	Popover,
	Link,
	useStore,
	SwipeoutActions,
	SwipeoutButton,
} from "framework7-react";
import utils from "../js/utils";
import Globals from "../js/globals";
import { Quest, QuestStep, QuestReward } from "../models/quest";
import store from "../js/store";
import { compileString } from "sass";

const QuestDetailsWindow = (props) => {
	const PAGE_TITLE: string = "Details";
	const ADD_QUEST_STEP_ENABLED: boolean = true;
	const ADD_QUEST_REWARD_ENABLED: boolean = true;
	// const { f7route, f7router } = props;
	// console.log(props.guid);

	let currentQuest: Quest = useStore(store, "quests").find((obj) => {
		return obj.guid === props.guid;
	});
	// console.log(currentQuest.title);

	// 	.find((q) => {
	// 	return q.guid === props.guid;
	// });

	const [questTitle, setQuestTitle] = useState(currentQuest.title);
	const [slug, setSlug] = useState(currentQuest.slug);
	const [guid, setGuid] = useState(currentQuest.guid);
	const [description, setDescription] = useState(currentQuest.description);
	const [questType, setQuestType] = useState(currentQuest.questType);
	const [isMainStoryQuest, setIsMainStoryQuest] = useState(
		currentQuest.isMainStoryQuest
	);

	const [questSteps, setQuestSteps] = useState(
		currentQuest.steps == undefined ? [] : currentQuest.steps
	);
	const [questRewards, setQuestRewards] = useState(
		currentQuest.rewards == undefined ? [] : currentQuest.rewards
	);

	const [isSorting, setIsSorting] = useState(false);
	const [wereChangesMade, setWereChangesMade] = useState(false);

	const copyToClipboardSymbolF7: string = "doc_on_clipboard";
	const copyToClipboardSymbolMaterial: string = "content_copy";

	const addSymbolF7: string = "plus";
	const addSymbolMaterial: string = "add";

	function UpdateQuestTitle(val: string) {
		setQuestTitle(val);
		setSlug(utils.sanitizeImportantString(val));
		checkForChanges();
	}

	function checkForChanges() {
		if (
			currentQuest.title != questTitle ||
			currentQuest.slug != slug ||
			currentQuest.guid != guid ||
			currentQuest.questType != questType ||
			currentQuest.isMainStoryQuest != isMainStoryQuest ||
			currentQuest.description != description ||
			currentQuest.steps != questSteps ||
			currentQuest.rewards != questRewards
		)
			setWereChangesMade(true);
		else setWereChangesMade(false);
	}

	function commitChanges() {
		// if (!wereChangesMade) {
		// 	console.log("Changes weren't made.");
		// 	return;
		// }

		console.log("Comitting Changes...");
		console.log(currentQuest.title);

		currentQuest.title = questTitle;
		currentQuest.slug = slug;
		currentQuest.guid = guid;
		currentQuest.questType = questType;
		currentQuest.isMainStoryQuest = isMainStoryQuest;
		currentQuest.description = description;
		currentQuest.steps = questSteps;
		currentQuest.rewards = questRewards;

		store.dispatch("updateQuest", { currentQuest });
		console.log("Changes Comitted!");
		console.log(currentQuest);

		setWereChangesMade(false);
	}

	function resetChanges() {
		setQuestTitle(currentQuest.title);
		setSlug(currentQuest.slug);
		setGuid(currentQuest.guid);
		setQuestType(currentQuest.questType);
		setIsMainStoryQuest(currentQuest.isMainStoryQuest);
		setDescription(currentQuest.description);
		setQuestSteps(
			currentQuest.steps == undefined ? [] : currentQuest.steps
		);
		setQuestRewards(
			currentQuest.rewards == undefined ? [] : currentQuest.rewards
		);

		setWereChangesMade(false);
	}

	function addQuestStep() {
		if (!ADD_QUEST_STEP_ENABLED) {
			f7.dialog.alert("Not Implemented Yet");
			return;
		}

		if (questSteps == undefined || questSteps.length == 0)
			setQuestSteps([]);

		var stepsWorkingCopy = [
			...questSteps,
			new QuestStep({
				title: "New Step",
			}),
		];

		setQuestSteps(stepsWorkingCopy);
	}

	function addQuestReward() {
		if (!ADD_QUEST_REWARD_ENABLED) {
			f7.dialog.alert("Not Implemented Yet");
			return;
		}

		if (questRewards == undefined || questRewards.length == 0)
			setQuestRewards([]);

		var rewardsWorkingCopy = [
			...questRewards,
			new QuestReward({
				title: "New Reward",
			}),
		];

		setQuestRewards(rewardsWorkingCopy);
	}

	function deleteQuestStep(guid: string) {
		var stepsWorkingCopy = questSteps.filter((x) => x.guid != guid);
		console.log(stepsWorkingCopy);
		setQuestSteps([...stepsWorkingCopy]);
		console.log(`Removed Quest Step with a GUID of ${guid}.`);
	}

	function deleteQuestReward(guid: string) {
		// const guid: string = getGuidFromSwipeoutDeletedElement("quest_reward");
		// var rewardsWorkingCopy = questSteps.filter((x) => x.guid != guid);
		// setQuestRewards(rewardsWorkingCopy);
		// console.log(`Removed Quest Reward with a GUID of ${guid}.`);
	}

	function renderSaveChangesButton() {
		if (wereChangesMade)
			return <Link onClick={(e) => console.log(e)}>Update</Link>;
	}

	function renderQuestSteps() {
		if (questSteps == undefined || questSteps.length == 0)
			return (
				<div>
					<Block strong inset className="centered empty-list-text">
						<p>No Quest Steps Exist</p>
					</Block>
					<List mediaList inset>
						<ListButton title="Add Step" onClick={addQuestStep} />
					</List>
				</div>
			);
		else
			return (
				<div>
					<List
						mediaList
						inset
						sortable
						sortableOpposite
						sortableEnabled
					>
						{questSteps.map((step) => (
							<ListItem
								title={step.title}
								after={step.getAssociatedTagText()}
								subtitle={step.getSummaryText()}
								text={step.summary}
								className="quest_step-list-item"
								key={step.guid}
								swipeout
								sortable
								onSwipeoutDeleted={() => {
									// deleteQuestStep(step.guid)
								}}
							>
								<SwipeoutActions right>
									<SwipeoutButton
										confirmText="Are you sure you want to delete this quest step?"
										className="not-delete-swipeout"
										onClick={() =>
											f7.dialog.confirm(
												"Are you sure you want to delete this quest step?",
												() => {
													deleteQuestStep(step.guid);
												}
											)
										}
									>
										Delete
									</SwipeoutButton>
								</SwipeoutActions>
							</ListItem>
						))}
						<ListButton
							title="Add Quest Step"
							onClick={addQuestStep}
						/>
					</List>
				</div>
			);
	}

	function renderQuestRewards() {
		if (questRewards == undefined || questRewards.length == 0)
			return (
				<div>
					<Block strong inset className="centered empty-list-text">
						<p>No Rewards Exist</p>
					</Block>

					<List mediaList inset>
						<ListButton
							title="Add Reward"
							onClick={addQuestReward}
						/>
					</List>
				</div>
			);
		else
			return (
				<div>
					<List mediaList inset>
						{questRewards.map((reward) => (
							<ListItem
								title="Title"
								after="After"
								subtitle="Subtitle"
								text="Text"
								className="quest_reward-list-item"
								key={reward.guid}
								swipeout
								onSwipeoutDeleted={() =>
									deleteQuestReward(reward.guid)
								}
							>
								<SwipeoutActions right>
									<SwipeoutButton
										delete
										confirmText="Are you sure you want to delete this quest reward?"
									>
										Delete
									</SwipeoutButton>
								</SwipeoutActions>
							</ListItem>
						))}
						<ListButton
							title="Add Reward"
							onClick={addQuestReward}
						/>
					</List>
				</div>
			);
	}

	return (
		<Page name="questdetails">
			<Navbar
				title={
					questTitle != ""
						? `${PAGE_TITLE} for \"${questTitle}\"`
						: PAGE_TITLE
				}
				backLink={props.guid == undefined ? "Back" : ""}
			>
				<NavRight>{renderSaveChangesButton()}</NavRight>
			</Navbar>

			<List inset>
				<ListInput
					label="Quest Title"
					type="text"
					placeholder="My Awesome Quest"
					value={questTitle}
					onChange={(e) => UpdateQuestTitle(e.target.value)}
					onBlur={checkForChanges}
					info="Visible in Game"
					clearButton
				></ListInput>

				<ListItem
					header="Friendly Name"
					title={slug != "" ? slug : "{None}"}
					noChevron
					onBlur={checkForChanges}
				>
					<Button
						slot="after"
						disabled={slug == ""}
						onClick={(e) => {
							utils.copyTextToClipboard(
								slug,
								"Quest Friendly Name"
							);
						}}
					>
						<Icon material={copyToClipboardSymbolMaterial} />
						{/* f7={copyToClipboardSymbolF7} */}
					</Button>
				</ListItem>
				<ListItem
					header="GUID"
					title={guid != "" ? guid : "None"}
					noChevron
					onBlur={checkForChanges}
				>
					<Button
						slot="after"
						onClick={(e) => {
							if (guid != "") {
								utils.copyTextToClipboard(guid, "Quest GUID");
							} else {
								setGuid(crypto.randomUUID());
							}
						}}
					>
						<Icon
							material={
								guid != ""
									? copyToClipboardSymbolMaterial
									: addSymbolMaterial
							}
						/>
						{/* f7={
									guid != ""
										? copyToClipboardSymbolF7
										: addSymbolF7
									} */}
					</Button>
				</ListItem>
			</List>

			{/* <BlockTitle>General Information</BlockTitle> */}
			<List inset>
				<ListItem
					title="Quest Type"
					smartSelect
					smartSelectParams={{ openIn: "popover" }}
				>
					<select
						name="quest_type"
						onChange={(e) => {
							setQuestType(e.target.value);
							checkForChanges();
						}}
						onBlur={checkForChanges}
						value={questType}
					>
						<option value="bounty">Bounty</option>
						<option value="protect">Protect</option>
						<option value="kill">Kill/Defeat</option>
					</select>
				</ListItem>

				<ListItem title="Part of Main Story">
					<Toggle
						slot="after"
						defaultChecked={isMainStoryQuest}
						onChange={(e) => setIsMainStoryQuest(e.target.checked)}
						onBlur={checkForChanges}
					/>
				</ListItem>
			</List>

			<List inset>
				<ListInput
					type="textarea"
					label="Description"
					placeholder="Description goes here..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					onBlur={checkForChanges}
					info="Visible in Game"
					clearButton
				></ListInput>
			</List>

			<BlockTitle>
				{utils.replaceTokenInStringWithArrayLength(
					"Quest Steps ({value})",
					"value",
					questSteps
				)}
			</BlockTitle>
			{renderQuestSteps()}

			<BlockTitle>
				{utils.replaceTokenInStringWithArrayLength(
					"Quest Rewards ({value})",
					"value",
					questRewards
				)}
			</BlockTitle>
			{renderQuestRewards()}

			<Row tag="p">
				<Col tag="span">
					<Button
						onClick={resetChanges}
						large
						color="red"
						// disabled={!wereChangesMade}
					>
						Delete Changes
					</Button>
				</Col>
				<Col tag="span">
					<Button
						onClick={commitChanges}
						large
						// disabled={!wereChangesMade}
					>
						Commit Changes
					</Button>
				</Col>
			</Row>
		</Page>
	);
};

export default QuestDetailsWindow;
