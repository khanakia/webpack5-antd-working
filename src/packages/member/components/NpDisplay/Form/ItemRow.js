import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageHeader, Form, message, Button, Input, Select, InputNumber, Switch, DatePicker } from 'antd';
import moment from 'moment';
import classnames from "classnames";

import { defaultDateFormat, bedInputRange } from "../../../constant";
import { useMediaStore } from "./store";

// const dateFormat = 'YYYY-MM-DD';
export default (props={}) => {
  const { item, idx } = props;
  let { id } = useParams();
  const loadingEl = useRef()
  const [items, setItems] = useState([])
  const history = useHistory();
  const store = useMediaStore();

  // const bedInputRange = Array.from(Array(10))

  const className = classnames({hasError: item.has_error})
  const disabled = item.is_new ? false : true

  const dateFromName = `items[${idx}][date_from]`
  const dateToName = `items[${idx}][date_to]`

  function disabledDate(current) {
    // Can not select days before today and today
    let startDate = store.minDate ? moment(store.minDate, defaultDateFormat) : moment()
    return current && current < startDate.endOf('day');
  }

  // console.log(store.minDate)

  const handleDelete = () => {
    console.log("delete")
    let items = [...store.items];
    
    const itemsN = _.filter(items, function(currentObject) {
      return currentObject.uid !== item.uid;
    });
    store.items = itemsN;

    // console.log(itemsN)
  }

  return (
    <tr className={className}>
      <td className="colDelete">
        {!disabled ? 
          <button type="button" className="btn btn-danger btn-xs" onClick={handleDelete}>
            <i className="fa fa-trash"></i>
          </button>
          : null
        }
      </td>
      <td className="col">
        <input 
          type="hidden"
          name={`items[${idx}][is_new]`}
          defaultValue={item.is_new} 
        />
        {/* <input 
          type="hidden"
          name={`items[${idx}][uid]`}
          defaultValue={item.uid} 
        /> */}

        {disabled ?
          <input 
            type="text" 
            className="form-control" 
            name={dateFromName}
            defaultValue={item.date_from} 
            readOnly
          />
          :
          <DatePicker 
            defaultValue={moment(item.date_from, defaultDateFormat)} 
            format={defaultDateFormat} 
            name={dateFromName}
            disabledDate={disabledDate}
          />
        }
      </td>
      <td className="col">
        {disabled ?
          <input 
            type="text" 
            className="form-control" 
            name={dateToName}
            defaultValue={item.date_to} 
            readOnly
          />
          :
          <DatePicker 
            defaultValue={moment(item.date_to, defaultDateFormat)} 
            format={defaultDateFormat} 
            name={dateToName}
          />
        }
      </td>
      <td className="colSm">
        <input 
          type="number" 
          className="form-control" 
          name={`items[${idx}][min_stay]`}
          defaultValue={item.min_stay} 
        />
      </td>
      {bedInputRange.map((_, i) => {
        const bedKey = 'bed_'+ (i+1)
        const val = item[bedKey]
        return (
          <td className="colSm" key={i}>
            <input 
              type="number" 
              className="form-control bed" 
              name={`items[${idx}][${bedKey}]`}
              defaultValue={val} 
            />
          </td>
        )
      })}
    </tr>
  )  
}