import React, { useState, useEffect, useRef, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form } from 'antd';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import Loading from 'packages/shared/components/Loading'
import dotProp from 'dot-prop'
import _ from "lodash"
import { generateUniqueId } from "../../utils"

const data = [
  {
    id: "1",
    title: 'Item 1',
    link: "https://gogole.com"
  },
  {
    id: 2,
    title: 'Item 2',
    link: "https://gogole2.com"
  },
  {
    id: 3,
    title: 'Item 3',
    link: "https://gogol3.com"
  }
]

const DragHanle = SortableHandle(() => <i className="fas fa-arrows-alt mr-2 dragHandle"></i>);

const SortableItem = SortableElement((props) => {
  const { idx, node, onRemove, onItemUpdate } = props
  // console.log(props)
  const handleRemove = () => {
    // console.log(idx)
    onRemove(idx)
  }
  // const uid = dotProp.get(item, 'item.uid', generateUniqueId());
  // const title = dotProp.get(item, 'item.uid', title);
  // const link = dotProp.get(item, 'item.uid', link);

  // const [state, setState] = useReducer(
  //   (state, newState) => ({ ...state, ...newState }),
  //   {
  //     id: node.id,
  //     title: node.title,
  //     link: node.link
  //   }
  // )

  // console.log(uid)
  const setValue = (key, value) => {
    // console.log(key, value);
    // setState({
    //   [key]: value
    // })

    node[key]= value;
    onItemUpdate(node)
  }

  // useEffect(() => {
  //   onItemUpdate(node)
  // }, [JSON.stringify(node)])

  return (
    <li className="SortableItem">
      <DragHanle />
      <div className="input-group">
        <input type="hidden" className="form-control" defaultValue={node.id} 
        />
        <input type="text" placeholder="Title" className="form-control title" value={node.title} 
          onChange={(e) => setValue("title", e.target.value)}
        />
        <input type="text" placeholder="Link" className="form-control" value={node.link} 
          onChange={(e) => setValue("link", e.target.value)}
        />
         <div className="input-group-append">
            <button key={`item-${node.id}`} className="btn btn-sm btn-danger" onClick={() => onRemove(idx)}><i className="fa fa-trash"></i></button>
         </div>
      </div>
    </li>
  )
}
);

const SortableList = SortableContainer(({ items, onRemove, onItemUpdate }) => {
  return (
    <ul className="SortableList Preset">
      {items.map((node, index) => {
        // console.log(index)
        return (
          <SortableItem key={`item-${node.id}`} index={index} idx={index} node={node} 
            onRemove={onRemove} 
            onItemUpdate={onItemUpdate}
          />
        )
      }
      )}
    </ul>
  );
});

const Input_ = ({ value = null, onChange }) => {
  let { id } = useParams();
  const loadingEl = useRef()

  const [items, setItems] = useState([])
  const history = useHistory();


  // const triggerChange = changedValue => {
  //   if (onChange) {
  //     onChange({ description, ...value, ...changedValue });
  //   }
  // };

  // const handleChange = (content, editor) => {
  //   // console.log('Content was updated:', content);
  //   // setDescription(content)
  //   onChange(content)
  // }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const items_ = arrayMove(items, oldIndex, newIndex)
    // console.log(items, oldIndex, newIndex)
    setItems(items_)
    // this.setState({
    //   items
    // });
  };

  const onRemove = (index) => {
    // console.log(index)
    const items_ = [...items]
    items_.splice(index, 1)
    // console.log(items_)
    // console.log(items)
    setItems(items_)
  }

  const handleAddNew = () => {
    const items_ = [...items, ...[{
      id: generateUniqueId(),
      title: "",
      link: ""
    }]]
    setItems(items_)
  }

  useEffect(() => {
    // console.log(items)
    onChange(JSON.stringify(items))
  }, [JSON.stringify(items)])

  useEffect(() => {
    try {
      let list = value ? JSON.parse(value) : []
      // console.log(list)
      setItems(list)
    } catch (error) {
      console.log(error)
    }
  }, [value])
  

  const onItemUpdate = (item) => {
    const items_ = [...items]
    let item_ = _.find(items, {id: item.id})
    item_ = item
    // console.log(item_)
    setItems(items_)
  }

  return (
    <div>
      <Loading ref={loadingEl} overlay />
      {/* <div className="mb-3 mw-400">
        <label>Properties:</label>
        <SelectPost onChange={onPostSelectChange} />
      </div> */}
      <SortableList 
        // pressDelay={200} 
        items={items} 
        onSortEnd={onSortEnd} 
        helperClass="SortableHelper" 
        onRemove={onRemove} 
        useDragHandle={true}
        onItemUpdate={onItemUpdate}
      />

      <div className="text-right">
        <button className="btn btn-dark btn-xs" type="button" onClick={handleAddNew}>Add New Links</button>
      </div>
    </div>
  )
}

const PresetClonableControl = (props={}) => {
  const { formItemProps={}} = props
  return (
    <React.Fragment>

      <Form.Item
        {...formItemProps}
        wrapperCol={{ span: 18 }}
      >
       <Input_ />
      </Form.Item>
    </React.Fragment>
  );
};

export default PresetClonableControl;