import React from 'react'
import Creatable from 'react-select/creatable';

import CreatableSelect from 'react-select/creatable';

import Select from 'react-select';


const ReactMultiSelect = ({selectOptions, SelectName,  isCreatable, onCreateOption}) => {
     const handleCreate = (inputValue) => {
          // Trigger the popup or modal when a new item is created
          if (onCreateOption) {
            onCreateOption(inputValue);
          }
        };
        return isCreatable ? (
          <CreatableSelect
            isMulti
            name={SelectName}
            options={selectOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onCreateOption={handleCreate}
          />
        ) : (
          <Select
            isMulti
            name={SelectName}
            options={selectOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        );
}

export default ReactMultiSelect;
