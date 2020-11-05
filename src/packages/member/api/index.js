const apiHost = APP_CONFIG.apiHost;

export const apiNpDisplaylistBulkForPost = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices_display/list_bulk_for_post`,
		data: params
	});
};


export const apiNpDisplayCreateBulkEntries= (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices_display/create_bulk`,
		data: params
	});
};

export const apiNpDisplayList = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices_display/list`,
		data: params
	});
};

export const apiNpDisplayShow = id => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices_display/${id}`
	});
};

export const apiNpDisplayCreate = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices_display`,
		data: params
	});
};

export const apiNpDisplayUpdate = (id, params = {}) => {
	return axios({
		method: "put",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices_display/${id}`,
		data: params
	});
};

export const apiNpDisplayDelete = id => {
	return axios({
		method: "delete",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices_display/${id}`
	});
};


export const apiNplistBulkForPost = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices/list_bulk_for_post`,
		data: params
	});
};

export const apiNpList = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/nightly_prices/list`,
		data: params
	});
};


export const apiPostListDdl = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/posts/list_ddl`,
		data: params
	});
};


export const apiSeoMetaTagList = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/seo_metatags/list`,
		data: params
	});
};

// export const apiSeoMetaTagGetByFilter = (params = {}) => {
// 	return axios({
// 		method: "post",
// 		url: `${apiHost}/wp-json/luxe/v1/seo_metatags/get_by_filter`,
// 		data: params
// 	});
// };

export const apiSeoMetaTagShow = id => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/seo_metatags/${id}`
	});
};

export const apiSeoMetaTagCreate = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/seo_metatags`,
		data: params
	});
};

export const apiSeoMetaTagUpdate = (id, params = {}) => {
	return axios({
		method: "put",
		url: `${apiHost}/wp-json/luxe/v1/seo_metatags/${id}`,
		data: params
	});
};

export const apiSeoMetaTagDelete = id => {
	return axios({
		method: "delete",
		url: `${apiHost}/wp-json/luxe/v1/seo_metatags/${id}`
	});
};

export const apiSeoUrlList = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/seo_urls/list`,
		data: params
	});
};

// export const apiSeoUrlGetByFilter = (params = {}) => {
// 	return axios({
// 		method: "post",
// 		url: `${apiHost}/wp-json/luxe/v1/seo_urls/get_by_filter`,
// 		data: params
// 	});
// };

export const apiSeoUrlShow = id => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/seo_urls/${id}`
	});
};

export const apiSeoUrlCreate = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/seo_urls`,
		data: params
	});
};

export const apiSeoUrlUpdate = (id, params = {}) => {
	return axios({
		method: "put",
		url: `${apiHost}/wp-json/luxe/v1/seo_urls/${id}`,
		data: params
	});
};

export const apiSeoUrlDelete = id => {
	return axios({
		method: "delete",
		url: `${apiHost}/wp-json/luxe/v1/seo_urls/${id}`
	});
};

export const apiSeoUrlOverridePageSave = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/seo_urls/override_page/save`,
		data: params
	});
};

export const apiSeoUrlOverridePageShow = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/seo_urls/override_page/show`,
		data: params
	});
};

export const apiPublicPropertyTypeList = id => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/p/property_type/list`
	});
};

export const apiPublicPropertyCountryList = id => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/p/property_country/list`
	});
};


export const apiPublicPropertyStateList = (params) => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/p/property_state/list`,
		params
	});
};

export const apiPublicPropertyCityList = (params) => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/p/property_city/list`,
		params
	});
};

export const apiPublicPropertyAreaList = id => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/p/property_area/list`
	});
};



export const apiLinkPresetList = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/link_presets/list`,
		data: params
	});
};

export const apiLinkPresetShow = id => {
	return axios({
		method: "get",
		url: `${apiHost}/wp-json/luxe/v1/link_presets/${id}`
	});
};

export const apiLinkPresetCreate = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/link_presets`,
		data: params
	});
};

export const apiLinkPresetUpdate = (id, params = {}) => {
	return axios({
		method: "put",
		url: `${apiHost}/wp-json/luxe/v1/link_presets/${id}`,
		data: params
	});
};

export const apiLinkPresetDelete = id => {
	return axios({
		method: "delete",
		url: `${apiHost}/wp-json/luxe/v1/link_presets/${id}`
	});
};


export const apiLinkPresetDdl = (params = {}) => {
	return axios({
		method: "post",
		url: `${apiHost}/wp-json/luxe/v1/link_presets/list_ddl`,
		data: params
	});
};