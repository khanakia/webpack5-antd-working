import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageHeader, Form, message, Button, Input, Select, InputNumber, Switch, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import debounce from "lodash/debounce";

import moment from "moment";
import dotProp from "dot-prop";
import {
	apiPublicPropertyTypeList,
	apiPublicPropertyCountryList,
	apiPublicPropertyStateList,
	apiPublicPropertyCityList,
	apiPublicPropertyAreaList,
	apiSeoUrlShow,
	apiSeoUrlCreate,
	apiSeoUrlUpdate,
} from "../../api";

import SelectK from "../shared/SelectK";
import SelectPost from "../shared/SelectPost";
import Loading from "packages/shared/components/Loading";

import { layout, tailLayout, getBedroomsList } from "../../constant";
import ShowWrap from "packages/shared/components/ShowWrap";

import EditorControl from "../shared/EditorControl";
import PresetInputControl from "../LinkPreset/PresetInputControl";
import SelectPreset from "../shared/SelectPreset";
import { generateUniqueId } from "../../utils"

function disabledDate(current) {
	// Can not select days before today and today
	return current && current.valueOf() < Date.now();
}

const SeoMetaTag = () => {
	let { id } = useParams();
	const [form] = Form.useForm();

	const history = useHistory();

	const loadingEl = useRef();

	const [item, setItem] = useState({});

	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const onFinish = (values) => {
		console.log("Success:", values);
		// return

		loadingEl.current.show();

		if (id) {
			apiSeoUrlUpdate(id, values).then((res) => {
				loadingEl.current.hide();
				const data = res.data;
				if (data.error) {
					message.error(data.error.message);
					return;
				}
				message.success(data.message);
				history.push("/seo_urls");
			});
		} else {
			apiSeoUrlCreate(values).then((res) => {
				loadingEl.current.hide();
				const data = res.data;
				if (data.error) {
					message.error(data.error.message);
					return;
				}
				message.success(data.message);
				history.push("/seo_urls");
			});
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const fetch = async () => {
		if (!id) return;
		loadingEl.current.show();
		// console.log(id);
		const response = await apiSeoUrlShow(id);
		const item = dotProp.get(response, "data.data", {});

		// item['date_from'] = moment(item['date_from'])
		// item['date_to'] = moment(item['date_to'])
		// console.log(item)
		// setItem(item)
		form.setFieldsValue(item);
		loadingEl.current.hide();
	};

	const fetchStates = async (parentSlug) => {
		// console.log(id);
		if (!parentSlug) return;
		loadingEl.current.show();
		const response = await apiPublicPropertyStateList({
			parent_slug: parentSlug,
		});
		const results = dotProp.get(response, "data.results", []);
		// console.log(results)
		setStates(results);
		loadingEl.current.hide();
	};

	const onCountryChange = async (value, data, item) => {
		// console.log(id, data, s)
		await fetchStates(item.slug);
	};

	const fetchCities = async (parentSlug) => {
		// console.log(id);
		if (!parentSlug) return;
		loadingEl.current.show();
		const response = await apiPublicPropertyCityList({
			parent_slug: parentSlug,
		});
		const citiesResult = dotProp.get(response, "data.results", []);
		// console.log(citiesResult)
		setCities(citiesResult);
		loadingEl.current.hide();
	};

	const onStateChange = async (value, data, item) => {
		// console.log(id, data, s)
		await fetchCities(item.slug);
	};

	const onPresetSelectChange = (value, data, item) => {
		console.log(item);
		form.setFieldsValue({
			footer_links_json: item.links_json,
		});
	};

	useEffect(() => {
		form.setFieldsValue({
			hide_state: false,
      hide_city: false,
      footer_links_json: `[{"id": "${generateUniqueId()}"}]`
		});

		fetch();
	}, []);

	const bedroomsList = getBedroomsList();

	return (
		<React.Fragment>
			<Loading ref={loadingEl} overlay />

			<PageHeader className="pageheader1" title="Seo Url" extra={[]} />
			<Form form={form} {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<ShowWrap show={!id}>
					<Form.Item label="Country" name="country_id">
						<SelectK placeholder={"All Countries"} api_fn={apiPublicPropertyCountryList} showSearch onChange={onCountryChange} />
					</Form.Item>

					<Form.Item label="State" name="state_id">
						<SelectK
							placeholder={"All States"}
							// api_fn={apiPublicPropertyStateList}
							data={states}
							showSearch
							onChange={onStateChange}
						/>
					</Form.Item>

					<Form.Item label="City" name="city_id">
						<SelectK
							placeholder={"All Cities"}
							// api_fn={apiPublicPropertyCityList}
							data={cities}
							showSearch
						/>
					</Form.Item>

					{/* <Form.Item
          label="Area"
          name="area_id"
        >
          <SelectK 
            placeholder={'All Areas'}
            api_fn={apiPublicPropertyAreaList}
          />
        </Form.Item> */}

					<Form.Item
						label="Bedrooms"
						name="bedrooms"
						// rules={[{ required: true, message: 'Field required.' }]}
					>
						<SelectK
							// title_key="bedrooms"
							placeholder={"All bedrooms"}
							data={bedroomsList}
						/>
					</Form.Item>

					<Form.Item
						label="Villa Type"
						name="type_id"
						// rules={[{ required: true, message: 'Field required.' }]}
					>
						<SelectK
							// title_key="bedrooms"
							placeholder={"All Villa Types"}
							api_fn={apiPublicPropertyTypeList}
						/>
					</Form.Item>
				</ShowWrap>

				<Form.Item
					label="Heading"
					name="heading"
					// rules={[{ required: true, message: 'Field required.' }]}
					extra={"Will show on the bottom of the page."}>
					<Input />
				</Form.Item>

				<Form.Item label="Hide Region Filter" name="hide_state" rules={[{ required: true, message: "Field required." }]} valuePropName="checked">
					<Switch />
				</Form.Item>

				<Form.Item label="Hide Area Filter" name="hide_city" rules={[{ required: true, message: "Field required." }]} valuePropName="checked">
					<Switch />
				</Form.Item>


				{/* <Form.Item
        label="Bottom Text"
        name="bottom_text"
        // rules={[{ required: true, message: 'Field required.' }]}
        extra={'Will show on First Page of Search Reults on bottom.'}
      >
        <Input.TextArea />
      </Form.Item> */}
				<EditorControl
					// form={form}
					formItemProps={{
						label: "Bottom Text",
						name: "bottom_text",
						rules: [{ required: true, message: "Field required." }],

						// extra:"Max. 1200 characters allowed."
						className: "mb-4",
					}}
				/>

				<h5 className="mt-5">Footer Links</h5>
				<Form.Item
					label="Footer Links Heading"
					name="footer_links_heading"
					// rules={[{ required: true, message: 'Field required.' }]}
					// extra={'Will show on First Page of Search Reults on top.'}
				>
					<Input />
				</Form.Item>

				<Form.Item label="Footer Links Excerpt" name="footer_links_desc">
					<Input.TextArea />
				</Form.Item>

				<div className="ant-row ant-form-item ant-form-item-has-success">
					<div className="ant-col ant-col-6 ant-form-item-label">
						<label>
							Select Existing Presets
						</label>
					</div>
					<div className="ant-col ant-col-8 ant-form-item-control">
						<div className="ant-form-item-control-input">
							<div className="ant-form-item-control-input-content">
							<SelectPreset onChange={onPresetSelectChange} />
							</div>
						</div>
					</div>
				</div>
				

				<PresetInputControl
					formItemProps={{
						// label:"Links",
						name: "footer_links_json",
						rules: [{ required: true, message: "Field required." }],
						className: "mb-1",
					}}
				/>

				{/* <Form.Item {...tailLayout}>
				</Form.Item> */}

        <div className="text-right">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
			</Form>
		</React.Fragment>
	);
};

export default SeoMetaTag;
