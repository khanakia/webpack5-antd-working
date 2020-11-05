import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import SelectPost from '../shared/SelectPost'
import { apiSeoUrlOverridePageSave, apiSeoUrlOverridePageShow } from '../../api'
import Loading from 'packages/shared/components/Loading'
import dotProp from 'dot-prop'

const DragHanle = SortableHandle(() => <i className="fas fa-arrows-alt mr-2 dragHandle"></i>);


const SortableItem = SortableElement((props) => {
  const { idx, node, onRemove } = props
  // console.log(props)
  const handleRemove = () => {
    // console.log(idx)
    onRemove(idx)
  }
  return (
    <li className="SortableItem">
      <DragHanle />
      <span className="badge badge-dark mr-3">ID: {node.ID}</span>
      <span className="title">{node.post_title} </span>
      <button key={`item-${node.ID}`} className="btn btn-sm btn-danger" onClick={() => onRemove(idx)}><i className="fa fa-trash"></i></button>
    </li>
  )
}
);

const SortableList = SortableContainer(({ items, onRemove }) => {
  return (
    <ul className="SortableList">
      {items.map((node, index) => {
        // console.log(index)
        return (
          <SortableItem key={`item-${node.ID}`} index={index} idx={index} node={node} onRemove={onRemove} />
        )
      }
      )}
    </ul>
  );
});


const aa = [
  {
    post_title: 'Item 1',
    ID: 1
  },
  {
    post_title: 'Item 2',
    ID: 2
  },
  {
    post_title: 'Item 3',
    ID: 3
  }
]

export default (props = {}) => {
  let { id } = useParams();
  const loadingEl = useRef()
  const [items, setItems] = useState([])
  const history = useHistory();

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const items_ = arrayMove(items, oldIndex, newIndex)
    // console.log(items, oldIndex, newIndex)
    setItems(items_)
    // this.setState({
    //   items
    // });
  };

  const onPostSelectChange = (value, data, item) => {
    console.log(item)
    setItems([
      ...items,
      ...[item]
    ])
  }

  const fetch = async () => {
    if (!id) return;
    loadingEl.current.show();
    // console.log(id);
    const response = await apiSeoUrlOverridePageShow({ id })
    // const posts = dotProp.get(response, 'data.data.posts', []);
    const posts = Sapp.Util.objValue(response, ['data', 'data', 'posts'], [])
    console.log(posts)
    setItems(posts)
    loadingEl.current.hide();
  }

  const handleSubmit = () => {
    console.log(items)
    loadingEl.current.show()
    apiSeoUrlOverridePageSave({
      id,
      posts: items
    }).then((res) => {
      loadingEl.current.hide()
      const data = res.data
      console.log(data)
      // if (data.error) {
      //   message.error(data.error.message)
      //   return
      // }
      // message.success(data.message);
      // history.push('/seo_urls')
    })

  }

  const onRemove = (index) => {
    // console.log(index)
    const items_ = [...items]
    items_.splice(index, 1)
    console.log(items_)
    // console.log(items)
    setItems(items_)
  }

  // console.log(arrayMove(items, 1, 0))

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Loading ref={loadingEl} overlay />
      <div className="mb-3 mw-400">
        <label>Properties:</label>
        <SelectPost onChange={onPostSelectChange} />
      </div>
      <SortableList 
        // pressDelay={200} 
        items={items} 
        onSortEnd={onSortEnd} 
        helperClass="SortableHelper" 
        onRemove={onRemove} 
        useDragHandle={true}
      />
      <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
    </div>
  )

}

// export default SortableComponent