import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {navigate, SCREEN_WIDTH, ThemeFunctions} from '../../../../utils';
import {Screen} from '../../../../enums';
import Colors from '../../../../theme/Colors';
import {useSelector} from 'react-redux';
import fonts from '../../../../theme/fonts';

const steps = [
  {id: 0, label: 'Step One', content: Screen.StepOneCardsTypeOrderScreen},
  {id: 1, label: 'Step Two', content: Screen.StepTwoCardsTypeOrderScreen},
  // {id: 2, label: 'Step Three', content: Screen.StepThreeCardsTypeOrderScreen},
];

const TabStep = ({curStep, item}) => {
  const [validateStep, setValidateStep] = useState(0);

  const {step} = useSelector((state: any) => state.paymentReducer);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  // console.log(step);

  // Function to handle tab click
  const handleStepChange = index => {
    navigate(steps[index].content, {item});
  };

  useEffect(() => {
    setValidateStep(step);
  }, [step]);

  return (
    <View>
      {/* Render Tabs */}
      <View style={styles.tabsContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <View style={styles.stepContainer}>
              <TouchableOpacity
                disabled={index > validateStep ? true : false}
                style={[
                  styles.tab,
                  // index <= validateStep && styles.validTab,
                  index <= curStep && styles.validTab,
                ]}
                onPress={() => handleStepChange(index)}>
                <Text
                  style={[
                    styles.tabLabel,
                    index <= validateStep && styles.validateLabel,
                    {
                      fontSize: SCREEN_WIDTH * 0.027,
                      color: curStep === index ? '#fff' : '#fff',
                    },
                  ]}>
                  {step.id + 1}
                </Text>
              </TouchableOpacity>
              <Text style={styles.labelText}>{step.label}</Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  index < validateStep
                    ? ThemeFunctions.themeBtnColor(appColor)
                    : {backgroundColor: Colors.currencyGreen},
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
    paddingBottom: 5,
  },
  tab: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  validTab: {
    backgroundColor: Colors.SolMain,
  },
  tabLabel: {
    color: '#555',
  },
  validateLabel: {
    color: '#fff',
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 2,
    width: '70%', // Adjust line width as needed
    // marginHorizontal: 5,
    marginTop: -23,
  },
  stepContainer: {
    alignItems: 'center', // Center aligns each step and its label
  },
  labelText: {
    marginTop: 5,
    fontSize: 10,
    color: '#fff',
  },
});

export default TabStep;
