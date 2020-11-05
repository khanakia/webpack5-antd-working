import React, { useState, useEffect, useRef, useReducer, useImperativeHandle, forwardRef  } from "react";
import { DatePicker } from "antd";
import dotProp from "dot-prop";
import { observer } from "mobx-react";
import moment from "moment";

import SelectPost from "../../shared/SelectPost";
import { defaultDateFormat, bedInputRange } from "../../../constant";
// import { generateUniqueId } from "../../../utils"
import { useMediaStore } from "./store";

let FilterBar = (props = {}, ref) => {
	const {onUpdate=()=>{}} = props
	// const [postId, setPostId] = useState(109);
  // const [dateFrom, setDateFrom] = useState(moment("2020-10-01"));
  const store = useMediaStore();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      post_id: null,
      date_from: null
    }
  )

	const onPostSelectChange = (value) => {
		// console.log(value);
    // setPostId(value);
    // setState({
    //   post_id: value
    // })

    const filters = {...store.filters}
    filters.post_id = value
    store.filters = filters
	};

	const onDateFromChange = (value) => {
		// console.log(value)
    // setDateFrom(value);
    // setState({
    //   date_from: value.format(defaultDateFormat)
    // })

    const filters = {...store.filters}
    filters.date_from = value.format(defaultDateFormat)
    store.filters = filters
  };
  
  useEffect(() => {
    // console.log("stateChanged")
    onUpdate(state)
  }, [JSON.stringify(state)])

  useImperativeHandle(ref, () => ({
    getState: () => {
      return state;
    },
  }));


	return (
		<div className="FilterBarBulkEntry">
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
            // defaultValue={dateFrom}
            format={defaultDateFormat}
            // name={`items[${idx}][date_from]`}
            onChange={onDateFromChange}
          />
        </div>
      </div>
    </div>
	);
};

FilterBar = forwardRef(FilterBar);

export default FilterBar;
