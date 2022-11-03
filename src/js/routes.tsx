import QuestDetailsPage from "../pages/quest_details";
import QuestDetailsEmpty from "../pages/quest_details_empty";

import NotFoundPage from "../pages/404";

const debugMode: boolean = false;

var routes = [
	{
		path: "/",
		component: debugMode ? QuestDetailsPage : QuestDetailsEmpty,
	},
	{
		path: "/quest/:guid/",
		component: QuestDetailsPage,
	},
	{
		path: "(.*)",
		component: NotFoundPage,
	},
];

export default routes;
