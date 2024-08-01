import React ,{useState} from 'react';
import Select from 'react-select';

const SelectDropdowns = () => {
    const colors = [
        { label: 'Gloss Red P.C.', value: '#E11F26' },
        { label: 'Gloss Yellow P.C.', value: '#facc15' },
        { label: 'Gloss Blue P.C.', value: '#1F2E60' },
        { label: 'Gloss Green P.C.', value: '#2A5C17' },
        { label: 'Gloss Orange P.C.', value: '#f37520' },
      ];
      const materials = [
        { label: 'Steel 1008', value: 'material1' },
        { label: 'Steel A36', value: 'material2' },
        { label: 'Aluminum 5052', value: 'material3' },
        { label: 'Aluminum 6061', value: 'material4' },
        { label: 'Stainless Steel 304 (2b)', value: 'material5' },
        { label: 'Stainless Steel 304 (#4)', value: 'material6' },
        { label: 'Stainless Steel 316 (2b)', value: 'material7' },
        { label: 'Brass 260', value: 'material8' },
      ];
      const thickness = [
        { label: '.040" / 1.02mm', value: 'thickness1' },
        { label: '.040" / 1.02mm', value: 'thickness2' },
        { label: '.040" / 1.02mm', value: 'thickness3' },
        { label: '.040" / 1.02mm', value: 'thickness4' },
      ];
      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          height: '34px',
          minHeight: '34px',
          display: 'flex',
          fontSize: 12,
          textAlign:'left',
          color: 'rgba(0,0,0,0.50)',
          borderColor: '#E6E6E6!important',
          boxShadow: 'none',
        }),
        singleValue: (provided, state) => {
          const color = state.data.value;
          return {
            ...provided,
            display: 'flex',
            alignItems: 'center',
            ':before': {
              content: '""',
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: color,
              marginRight: '5px',
            },
          };
        }, indicatorSeparator: () => ({
          display: 'none',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,            
          padding: 6
        }),
        menu: (provided) => ({
          ...provided,
          fontSize: '12px',
        }),
        option: (provided, state) => {
          const color = state.data.value;
          return {
            ...provided,
            display: 'flex',
            alignItems: 'center',
            ':before': {
              content: '""',
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: color,
              marginRight: '5px',
            },
          };
        },
      };
      const ColorSelect = () => {
        const [selectedColor, setSelectedColor] = useState(null);
    
        return (
          <Select
            options={colors}
            styles={customStyles}
            onChange={setSelectedColor}
            value={selectedColor}
            placeholder="Select a Finish"
            className="selectdropdown"
            isSearchable={false}
    
          />
        );
      };
      const SimpleSelect = ({ options, placeholder }) => {
        const [selectedOption, setSelectedOption] = useState(null);
    
        return (
          <Select
            options={options}
            onChange={setSelectedOption}
            value={selectedOption}
            placeholder={placeholder}
            className="selectdropdown"
            styles={customStyles}
            isSearchable={false}
          />
        );
      };
    return (
    <div className="quotes-dropdown flex-md-row d-flex align-item-center justify-content-md-start justify-content-center">
              <SimpleSelect options={materials} placeholder="Select a Material" />
              <SimpleSelect options={thickness} placeholder="Select a Thickness" />
              <ColorSelect />
    </div>
    );
}
export default SelectDropdowns;
