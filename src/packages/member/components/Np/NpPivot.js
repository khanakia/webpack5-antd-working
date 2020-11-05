import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import Loading from "packages/shared/components/Loading";
import dotProp from "dot-prop";
import { observer } from "mobx-react";
import moment from "moment";

import { apiNplistBulkForPost } from "../../api";
import { defaultDateFormat, bedInputRange } from "../../constant";
// import { generateUniqueId } from "../../../utils"

let NpPivot = (props = {}, ref) => {
	const { postId, dateFrom } = props;

	const loadingEl = useRef();

	const [items, setItems] = useState([]);

	const fetchList = async (data={}) => {
    // if (!postId || !dateFrom) return;
    if (!data.post_id || !data.date_from) return;
		loadingEl.current.show();
		// console.log(id);
		// const data = {
		// 	post_id: postId,
		// 	date_from: dateFrom.format(defaultDateFormat),
		// };
		const response = await apiNplistBulkForPost(data);
		// console.log(response);
		const responseItems = dotProp.get(response, "data", []);
		setItems(responseItems)

		loadingEl.current.hide();
  };
  

  useImperativeHandle(ref, () => ({
    fetch: (data) => {
      // console.log(data)
      fetchList(data)
    },
  }));

	// useEffect(() => {
	// 	fetch();
	// }, [postId, dateFrom]);

	// console.log("items", items);

	return (
		<div className="NpPivot">
			<Loading ref={loadingEl} overlay />
			<table className="table displayEntry table-striped">
				<thead>
					<tr>
						<th>Date</th>
						{bedInputRange.map((_, i) => {
							return <th key={i + 1}>{i + 1} Room</th>;
						})}
					</tr>
				</thead>
				<tbody>
          {items.map((item, i) => {
							return <ItemRow item={item} idx={i} key={Math.random(10)} />;
						})}
        </tbody>
			</table>
		</div>
	);
};

NpPivot = forwardRef(NpPivot);

export default NpPivot;

const ItemRow = (props={}) => {
  const { item, idx } = props;
  return (
    <tr>
      <td className="col">
        {item.dated}
      </td>
     
      {bedInputRange.map((_, i) => {
        const bedKey = 'bed_'+ (i+1)
        const val = item[bedKey]
        return (
          <td className="colSm" key={i}>
            {val}
          </td>
        )
      })}
    </tr>
  )  
}