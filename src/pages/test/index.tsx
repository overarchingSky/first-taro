import { Config, useState, useReducer } from "@tarojs/taro";
import { View, Button, Text } from '@tarojs/components'


const reducer = (state, action) => {
    switch (action.type) {
      case 'update': return {...state,text:action.text};
      case 'reset': return 0;
      default: throw new Error('Unexpected action');
    }
}
  
function Test() {

    //let [text,setText] = useState('来点内容吧')
    let [{text}, dispatch] = useReducer(reducer, {text:'来点内容吧'})
    console.log('dispatch',text)
    return (
        <View className='index'>
            <Text>test</Text>
            <Text>{text}</Text>
            <input type="text" onInput={e => dispatch({type:'update',text:e.target.value})} />
        </View>
    )
}

namespace Test {
    export let config:Config
}

Test.config = {
    navigationBarTitleText: '测试页面'
}

export default Test