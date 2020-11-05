
export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};

export const tailLayout = {
  wrapperCol: { offset: 6, span: 8 },
};


export const getBedroomsList = () => {
  let list = []
  // list.push({
  //   id: '', 
  //   title: 'All bedrooms'
  // })
  for (let index = 1; index <= 20; index++) {
    list.push({
      id: index, 
      title: index
    })
  }
  return list
}

export const defaultDateFormat = 'YYYY-MM-DD';

export const bedInputRange = Array.from(Array(10));