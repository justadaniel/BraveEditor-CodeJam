import QuestDetailsPage from "../pages/QuestDetailsWindow";
import QuestDetailsEmpty from "../pages/QuestDetailsEmpty";

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
