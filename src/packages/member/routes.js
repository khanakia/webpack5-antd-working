import NpDisplayList from "./components/NpDisplay/NpDisplayList";
import NpDisplay from "./components/NpDisplay/NpDisplay";
import NpDisplayEntry from "./components/NpDisplay/Form/NpDisplayEntry";

import NpList from "./components/Np/NpList";

import SeoMetaTagList from "./components/SeoMetaTag/SeoMetaTagList";
import SeoMetaTag from "./components/SeoMetaTag/SeoMetaTag";

import SeoUrlList from "./components/SeoUrl/SeoUrlList";
import SeoUrl from "./components/SeoUrl/SeoUrl";
import OverrideFirstPage from "./components/SeoUrl/OverrideFirstPage";


import LinkPresetList from "./components/LinkPreset/LinkPresetList";
import LinkPreset from "./components/LinkPreset/LinkPreset";

const routes = [
	{
		path: "/",
		exact: true,
		component: NpDisplayList,
		priority: 0,
		layout: "LayoutPrivate",
	},


	{
		path: "/npd/entry_bulk",
		exact: true,
		component: NpDisplayEntry,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/npd",
		exact: true,
		component: NpDisplay,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/npds/:id",
		exact: true,
		component: NpDisplay,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/nps",
		exact: true,
		component: NpList,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/seo_meta_tags",
		exact: true,
		component: SeoMetaTagList,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/seo_meta_tag",
		exact: true,
		component: SeoMetaTag,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/seo_meta_tags/:id",
		exact: true,
		component: SeoMetaTag,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/seo_urls",
		exact: true,
		component: SeoUrlList,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/seo_url",
		exact: true,
		component: SeoUrl,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/seo_urls/:id",
		exact: true,
		component: SeoUrl,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/seo_urls/override_first_page/:id",
		exact: true,
		component: OverrideFirstPage,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/link_presets",
		exact: true,
		component: LinkPresetList,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/link_preset",
		exact: true,
		component: LinkPreset,
		priority: 0,
		layout: "LayoutPrivate",
	},

	{
		path: "/link_presets/:id",
		exact: true,
		component: LinkPreset,
		priority: 0,
		layout: "LayoutPrivate",
	},

];

export default routes;