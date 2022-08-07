import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';

const SelectingDropDown = props => {
  const {title, data, setState} = props;

  return (
    <SelectDropdown
      defaultButtonText={title}
      data={data}
      onSelect={(selectedItem, index) => {
        setState(selectedItem.id);
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
