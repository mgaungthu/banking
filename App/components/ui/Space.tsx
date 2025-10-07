import React from 'react';
import { View } from 'react-native';

const Space = React.memo(({width, height} : {width?: number, height?: number}) =>{
    return(
        <View style={{width, height}} />
    )
})

export default Space