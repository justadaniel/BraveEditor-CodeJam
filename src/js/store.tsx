import { createStore } from "framework7/lite";
import {
	Quest,
	QuestStep,
	QuestReward,
	QuestType,
	QuestStepType,
	RewardType,
} from "../models/quest";
import utils from "./utils";

const store = createStore({
	state: {
		isLoading: false,
		currentlyAccessedFilePath: undefined,
		hasFileLoaded: false,
		isReadingFromDisk: false,
		isWritingToDisk: false,
		products: [
			{
				id: "1",
				title: "Apple iPhone 8",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
			},
			{
				id: "2",
				title: "Apple iPhone 8 Plus",
				description:
					"Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!",
			},
			{
				id: "3",
				title: "Apple iPhone X",
				description:
					"Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.",
			},
		],
		quests: [],
	},
	getters: {
		products({ state }) {
			return state.products;
		},
		quests({ state }): Quest[] {
			var quests = Quest.sortByModifiedDate(state.quests);
			return quests;
		},
		quest({ state }, guid: string): Quest {
			var quests = Quest.sortByModifiedDate(state.quests);
			const quest = state.quests.find((obj) => {
				return obj.guid === guid;
			});
			return quest;
		},
		isLoading({ state }): boolean {
			return state.isLoading;
		},
		hasFileLoaded({ state }): boolean {
			return state.hasFileLoaded;
		},
		currentlyAccessedFilePath({ state }): string {
			return state.currentlyAccessedFilePath;
		},
	},
	actions: {
		setLoading({ state }, isLoading: boolean) {
			state.isLoading = isLoading;
		},
		setCurrentlyAccessedFile({ state }, filePath: string) {
			state.currentlyAccessedFilePath = filePath;
			state.hasFileLoaded = filePath != undefined && filePath != "";
			console.log("Currently Accessed File: " + filePath);
		},
		setWritingToDisk({ state }, isWritingToDisk: boolean) {
			state.isWritingToDisk = isWritingToDisk;
		},
		addProduct({ state }, product) {
			state.products = [...state.products, product];
		},
		loadQuests({ state, dispatch }, { filePath }) {
			if (filePath == undefined || filePath == "") return;

			dispatch("setLoading", true);
			dispatch("setCurrentlyAccessedFile", filePath);

			setTimeout(() => {
				state.quests = [
					new Quest({
						title: "A Tablet's Worth",
						slug: utils.sanitizeImportantString("A Tablet's Worth"),
						guid: crypto.randomUUID(),
						lastModified: 1667325074989,
						description:
							"Jeff has been on the hunt for this stone tablet for years. However, he's pretty stupid so he's been looking inside various Goodwill locations instead of actually traveling anywhere.",
						questType: "bounty",
						isMainStoryQuest: false,
						steps: [
							new QuestStep({
								title: "Find the Stone Tablet",
								associatedItemNameTag: "stonetablet001",
								questStepType: QuestStepType.Retrieve,
								guid: crypto.randomUUID(),
							}),
							new QuestStep({
								title: "Bring the Stone Tablet to Jeff",
								associatedItemNameTag: "stonetablet001",
								questStepType: QuestStepType.Talk,
								guid: crypto.randomUUID(),
							}),
						],
						rewards: [
							new QuestReward({
								title: "XP",
								rewardType: RewardType.XP,
								guid: crypto.randomUUID(),
							}),
						],
					}),
					new Quest({
						title: "The Battle Within",
						lastModified: 1667325049027,
						slug: utils.sanitizeImportantString(
							"The Battle Within"
						),
						guid: crypto.randomUUID(),
						description:
							"I'm too lazy to write a description. Write one yourself.",
						questType: "kill",
						isMainStoryQuest: true,
						steps: undefined,
					}),
				];
				dispatch("setLoading", false);
				// dispatch("closeQuestsFile");
			}, 1000);
		},
		addQuest({ state, dispatch }, quest: Quest) {
			dispatch("setLoading", true);
			state.quests = [...state.quests, quest];
			dispatch("setLoading", false);
		},
		saveQuests({ state, dispatch }) {
			dispatch("setWritingToDisk", true);
			dispatch("setWritingToDisk", false);
		},
		closeQuestsFile({ state, dispatch }) {
			dispatch("setCurrentlyAccessedFile", undefined);
		},
		updateQuest({ state, dispatch }, quest: Quest) {
			let objIndex: number = state.quests.findIndex(
				(obj) => obj.guid == quest.guid
			);

			if (objIndex == undefined) {
				console.error(`Quest in store doesn't exist.`);
				return;
			}

			if (objIndex >= 0 && objIndex < state.quests.length) {
				dispatch("setWritingToDisk", true);
				state.quests[objIndex] = quest;
				dispatch("setWritingToDisk", false);
			}
		},
		getQuest({ state, dispatch }, guid: string): any {
			dispatch("setLoading", true);
			const quest = state.quests.find((obj) => {
				return obj.guid === guid;
			});
			return quest;
			dispatch("setLoading", false);
		},
	},
});

export default store;
