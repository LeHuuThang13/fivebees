import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import colors from '../../../assets/themes/colors';
import {Text} from 'react-native';
import ArrowDownIcon from '../../../assets/icons/arrowDown.svg';

const SelectingDropDown = props => {
  const {title, data, setState, setIsEdited} = props;

  return (
    <SelectDropdown
      defaultButtonText={title}
      data={data}
      buttonStyle={{
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderColor: colors.border_input,
        marginBottom: 12,
        borderRadius: 6,
        height: 30,
      }}
      dropdownStyle={{
        backgroundColor: colors.white,
      }}
      rowTextStyle={{
        color: colors.secondary,
      }}
      renderDropdownIcon={() => {
        return <ArrowDownIcon />;
      }}
      onSelect={(selectedItem, index) => {
        setState(selectedItem.id);
        setIsEdited(true);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem.name || selectedItem.room_number;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item.name || item.room_number;
      }}
    />
  );
};

export default SelectingDropDown;
