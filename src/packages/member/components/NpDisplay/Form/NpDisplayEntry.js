import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { message, Tabs } from "antd";
import dotProp from "dot-prop";
import { observer } from "mobx-react";
import moment from "moment";

const { TabPane } = Tabs;

import Loading from "packages/shared/components/Loading";
// import SelectPost from "../../shared/SelectPost";
import FilterBar from "./FilterBar";
import ItemRow from "./ItemRow";
import NpPivot from "../../Np/NpPivot";

import { useMediaStore } from "./store";
import { apiPostListDdl, apiNpDisplaylistBulkForPost, apiNpDisplayCreateBulkEntries } from "../../../api";
import { defaultDateFormat, bedInputRange } from "../../../constant";
import { generateUniqueId } from "../../../utils"

const NpDisplayEntry = () => {
	let { id } = useParams();
	const loadingEl = useRef();
	const history = useHistory();
	const npPivot = useRef();
	const filterBarRef = useRef();
	const form = useRef();
	const [postId, setPostId] = useState(109);
	const [dateFrom, setDateFrom] = useState(moment("2020-10-01"));

	const store = useMediaStore();
	window.store = store;

	const fetch = async () => {
		let data = store.filters
		if (!data.post_id || !data.date_from) return;
		loadingEl.current.show();
		// console.log(id);
		// const data = {
		// 	post_id: postId,
		// 	date_from: dateFrom.format(defaultDateFormat),
		// };
		const response = await apiNpDisplaylistBulkForPost(data);
		// console.log(response);
		const responseItems = dotProp.get(response, "data", []);
		store.items = responseItems;

		let lastItem = _.last(store.items);
		// console.log(lastItem)

		// If the items found then the minDate will be the lastEntry Date
		// Otherwise the mindate will be the FilterDate so no entry can be made before the min date
		if(lastItem) {
			store.minDate = lastItem.date_to
		} else {
			store.minDate = store.filters.date_from
		}

		
		loadingEl.current.hide();
	};

	const handleAddNew = () => {
		let items = [...store.items];
		items = [
			...items,
			...[
				{
					is_new: 1,
					uid: generateUniqueId(),
					hasError: false,
					date_from: moment(store.minDate).format("YYYY-MM-DD"),
					date_to: moment(store.minDate).format("YYYY-MM-DD"),
				},
			],
		];
		store.items = items;
	};

	const handelSave = () => {
		let values = jQuery("form").serialize();

		// const filterData = filterBarRef.current.getState();
		let filters = store.filters

		// We need date_from to validate otherwise if date is not selected and user can 
		// add existing date ranges which can conflicte the whole nightly prices table
		if(!filters || !filters.post_id || !filters.date_from) {
			toastr.error("Please select the Property and Date first.")
			return
		}

		window.searchParams = new URLSearchParams(values);
		searchParams.set("post_id", filters.post_id);
		searchParams.set("date_from", filters.date_from);

		// searchParams.set("post_id", postId);
		// searchParams.set("date_from", dateFrom.format(defaultDateFormat));
		values = searchParams.toString();

		loadingEl.current.show();
		apiNpDisplayCreateBulkEntries(values).then((res) => {
			loadingEl.current.hide();
			const data = res.data;
			store.items = data.items;

			npPivot.current.fetch(filters);

			if (data.error) {
				message.error(data.error.message);
				return;
			}
			message.success("Saved successfully");
			// history.push('/')
		});
	};

	// const onPostSelectChange = (value) => {
	// 	console.log(value);
	// 	setPostId(value);
	// };

	// const onDateFromChange = (value) => {
	// 	// console.log(value)
	// 	setDateFrom(value);
	// };

	const onFilterUpdate = (data) => {
		// console.log(data);
		// fetch(data);
		// npPivot.current.fetch(data);
	};

	const fetchPriceTable = async () => {
		let data = store.filters
		if (!data.post_id || !data.date_from) return;
		npPivot.current.fetch(data);
	}

	useEffect(() => {
		fetch();
		fetchPriceTable();
	}, [JSON.stringify(store.filters)]);

	// useEffect(() => {
	// 	fetch();
	// }, [postId, dateFrom]);

	// useEffect(() => {
	// 	npPivot.current.fetch({})
	// })
	// const bedInputRange = Array.from(Array(10));

	// console.log(store.filters)
	const items = dotProp.get(store, "items", []);
	// console.log("items", items);

	// const filterData = filterBarRef.current.getState();

	return (
		<div className="NpDisplayEntry">
			<Loading ref={loadingEl} overlay />
			<form ref={form}>
				{/* <div className="filterbar">
					<div className="form-row">
						<div className="col-md-3 mb-3">
							<label>Select Property</label>
							<SelectPost
								// className="d-block"
								onChange={onPostSelectChange}
							/>
						</div>
						<div className="col-md-3 mb-3">
							<label>Date</label>
							<DatePicker
								className="d-block"
								defaultValue={dateFrom}
								format={defaultDateFormat}
								// name={`items[${idx}][date_from]`}
								onChange={onDateFromChange}
							/>
						</div>
					</div>
				</div> */}

				<FilterBar ref={filterBarRef} onUpdate={onFilterUpdate} />

				<Tabs defaultActiveKey="1" type="card">
					<TabPane tab="Date Ranges" key="1">
						<table className="table displayEntry">
							<thead>
								<tr>
									<th></th>
									<th>Season Date</th>
									<th>Season Date</th>
									<th>Nigths</th>
									{bedInputRange.map((_, i) => {
										return <th key={i + 1}>{i + 1} Room</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{items.map((item, i) => {
									return <ItemRow 
											item={item} 
											idx={i} 
											key={item.uid} 
											minDate={store.filters.date_from}
										/>;
								})}
							</tbody>
						</table>
						<div className="text-left">
							<button type="button" className="btn btn-xs btn-dark" onClick={handleAddNew}>
								Add New
							</button>
						</div>

						<div className="text-right mt-3">
							<button type="button" className="btn btn-primary btn-sm" onClick={handelSave}>
								Save
							</button>
						</div>
					</TabPane>
					<TabPane tab="Price Table" key="2" forceRender={true}>
						<NpPivot ref={npPivot} />
					</TabPane>
				</Tabs>
			</form>
		</div>
	);
};

export default observer(NpDisplayEntry);
