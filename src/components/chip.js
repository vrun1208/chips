import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const ChipComponent = ({ options }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isShow, setShow] = useState(false);
    const inputRef = useRef(null);

    //hadle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    //handle toggle list show/hide
    const handleToggle = () => {
        setShow(!isShow);
    };

    const toggleOff = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setShow(!isShow);
        }
    }

    useEffect(() => {
        document.addEventListener('click', toggleOff);
        return () => {
            document.removeEventListener('click', toggleOff);
        };
    }, []);

    // add items to the field
    const handleItemClick = (item) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([...selectedItems, item]);
            setInputValue('');
        }
    };

    // remove items from the field
    const handleChipRemove = (item) => {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    };

    return (
        <div>
            <div className="multi-select-container">
                <ul className="selected-items">
                    {selectedItems.map((item, index) => (
                        <li key={index} className="chip">
                            {item}
                            <span onClick={() => handleChipRemove(item)}>X</span>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={handleToggle}
                    placeholder={inputValue.length === 0 ? 'type or select' : ''}
                    className="input-field"
                />
            </div>
            <div>
                {isShow && (
                    <ul className="item-list">
                        {options
                            //filter items from options and add to the field
                            .filter((item) => !selectedItems.includes(item))
                            .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
                            .map((item, index) => (
                                <li key={index} onClick={() => handleItemClick(item)}>
                                    {item}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ChipComponent;
