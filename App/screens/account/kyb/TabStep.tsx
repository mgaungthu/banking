import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {navigate, SCREEN_WIDTH} from '../../../utils';
import {Screen} from '../../../enums';
import Colors from '../../../theme/Colors';
import {useSelector} from 'react-redux';
import fonts from '../../../theme/fonts';

const steps = [
  {id: 0, label: 'Basic Info', content: Screen.BusinessBasicInfoView},
  {id: 1, label: 'Company Docs', content: Screen.BusinessCompanyDocuments},
  {id: 2, label: 'License Information', content: Screen.LicenseInfoView},
  {id: 3, label: 'Contact Details', content: Screen.ContactDetailView},
  {id: 4, label: 'Confirmation', content: Screen.ConfirmView},
];

const TabStep = ({curStep}) => {
  const [validateStep, setValidateStep] = useState(0);

  const {step} = useSelector((state: any) => state.kybReducer);

  // console.log(step);

  // Function to handle tab click
  const handleStepChange = index => {
    navigate(steps[index].content);
  };

  useEffect(() => {
    setValidateStep(step);
  }, [step]);

  return (
    <View>
      {/* Render Tabs */}
      <View style={styles.tabsContainer}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={step.id}
            disabled={index > validateStep ? true : false}
            style={[styles.tab, index <= validateStep && styles.validTab]}
            onPress={() => handleStepChange(index)}>
            <Text
              adjustsFontSizeToFit={true}
              style={[
                styles.tabLabel,
                index <= validateStep && styles.validateLabel,
                {
                  fontSize: SCREEN_WIDTH * 0.023,
                  color: curStep === index ? Colors.contentRed : '#000',
                },
              ]}>
              {step.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    paddingBottom: 5,
    // paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  validTab: {
    borderBottomColor: Colors.contentRed,
  },
  tabLabel: {
    color: '#555',
  },
  validateLabel: {
    color: Colors.contentRed,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
  },
});

export default TabStep;
