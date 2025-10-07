import React from 'react';
import { Text } from "react-native";
import { useSelector } from "react-redux";
import styles from "../../../screens/pos/styles";
import { ThemeFunctions } from "../../../utils";
import ThemeText from '../ThemeText';

export default ({ children, bold, styleExtend }: { children: any; bold?: boolean, styleExtend?: any }) => {
    const { appTheme } = useSelector((state: any) => state.globalReducer)

    return(
        <ThemeText style={[
            styles.titleDefault,
            { fontWeight: bold ? 'bold' : 'normal' },
            styleExtend
        ]}
        >
            {children}
        </ThemeText>
    )
}