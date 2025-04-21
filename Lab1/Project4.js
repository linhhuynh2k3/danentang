import React, {use, useState} from "react"
import { Text, Button, View } from "react-native"

const PressTest = () =>{
    const [pressCount, setPressCount]=useState(0);
    return(
        <View style={{alignItems:"center", marginTop:20}}>
            <Text>You've preessed the button: {pressCount} time(s)</Text>
            <Button title={`Press ${pressCount} time(s)`}
                onPress={()=>setPressCount(pressCount+1)}/>
        </View>
    );
};

export default PressTest;