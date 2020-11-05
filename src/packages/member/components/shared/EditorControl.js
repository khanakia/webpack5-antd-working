import React, { useState, useEffect, useRef } from "react";
// import { useHistory, useParams } from "react-router-dom";
import { Form } from 'antd';
// import dotProp from 'dot-prop'
// import { serviceShow, serviceCreate, serviceUpdate, websiteListSelect } from '../../Api'

// import ReactQuill from 'react-quill'; // ES6
import { Editor } from '@tinymce/tinymce-react';
// import ServiceTypeDropdown from '../Shared/ServiceTypeDropdown'
// import SelectK from '../Shared/SelectK'
// import TextArea from "antd/lib/input/TextArea";
// import Loading from 'packages/shared/components/Loading'

// import {layout, layout1, tailLayout, serviceIcons } from '../../constant'
const EditorInput = ({ value = null, onChange }) => {
  const [description, setDescription] = useState(null);

  // const triggerChange = changedValue => {
  //   if (onChange) {
  //     onChange({ description, ...value, ...changedValue });
  //   }
  // };

  const handleEditorChange = (content, editor) => {
    // console.log('Content was updated:', content);
    setDescription(content)
    onChange(content)
  }

  // console.log(value)

  return (
    <Editor
      //  initialValue="<p>This is the initial content of the editor</p>"
      // initialValue={description}
      value={value}
      tinymceScriptSrc='/assets/js/tinymce/tinymce.min.js'
      init={{
        height: 300,
        menubar: false,
        valid_elements : '*[*]',
        extended_valid_elements:"style,link[href|rel]",
        custom_elements:"style,link,~link",     
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat code | help'
      }}
      onEditorChange={handleEditorChange}
    />
  )
}

const EditorControl = (props={}) => {
  const { formItemProps={}} = props
  // const [item, setItem] = useState({});
  // const [description, setDescription] = useState(null);

  // const handleEditorChange = (content, editor) => {
  //   console.log('Content was updated:', content);
  //   // setDescription(content)
  //   // // console.log(form)
  //   // form.setFieldsValue({
  //   //   [fieldKey]: content
  //   // });
  // }

  // useEffect(() => {
  //   form.setFieldsValue({
  //     status: false
  //   });
    
  //   fetch();
  // }, []);

  return (
    <React.Fragment>

      <Form.Item
        {...formItemProps}
        // label="Description"
        // name={'aboutBusinessLong'}
        // rules={[{ required: true, message: 'Field required.' }]}
        wrapperCol={{ span: 12 }}
      >
       <EditorInput />
       {/* <TextArea /> */}
      </Form.Item>
    </React.Fragment>
  );
};

export default EditorControl;