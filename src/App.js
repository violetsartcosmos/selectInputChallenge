import './Css/App.css';
import React, { useState } from 'react'
import classnames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCat, faDog, faDragon, faFish, faCow, faHorse, faSpider, faCaretDown } from "@fortawesome/free-solid-svg-icons";

//Dataset for options
const animals = [
    "cat",
    "dog",
    "dragon",
    "fish",
    "cow",
    "horse",
    "spider",
];
// Setup to use fontawesome icons
library.add( faCat, faDog, faDragon, faFish, faCow, faHorse, faSpider, faCaretDown);

// Animal Option - Each option for the dropdown can be clicked, has a hover animation and icon from animals list
function AnimalOption ({animal, onClick}) {
    return (
        <li
            onClick={onClick}
            data-value={animal}
        >
                {animal}
                <FontAwesomeIcon icon={animal} />
        </li>
    );
}

// Application that displays an input structured to look like a dropdown with searchable options
function App() {
    const [inputVal, setInputVal] = useState("");
    const [isOpen, changeOpen] = useState(false);
    const [finalResult, changeFinalResult] = useState("");

    // On change of input value, set the state to change the results and reset the final result
    const onChange = (event) => {
        setInputVal(event.target.value);
        if(finalResult) changeFinalResult("");
    }

    // Clicking the input will also set the dropdown to open if it isn't already, like initial
    const inputOnClick = (event) => {
        if(!isOpen) changeOpen(true);
    }
    
    // Clicking the Animal Option will set the final answer, close the dropdown, and update the input text to match
    const onClick = (event, finalAnswer) => {
        changeOpen(false);
        changeFinalResult((
            <div className='final'>{finalAnswer} <FontAwesomeIcon icon={finalAnswer} /></div>
        ));
        setInputVal(finalAnswer);
    }

    // Renders the animal options to include only the options that match or contain the input value string. For ex. "C" will show cat animal option
    const renderAnimalOptions = () => {
        return animals.map((animal) => {
            if(animal.includes(inputVal)) {
                return (<AnimalOption animal={animal} onClick={(event) => onClick(event, animal)} key={animal} />);
            } else {
                return null;
            }
        });
    }

    return (
		<>
            <div className='input-holder'>
                <input
                    placeholder={!isOpen && !finalResult ? "Choose a cute animal:" : '' }
                    onChange={onChange}
                    onClick={inputOnClick}
                    value={inputVal}
                    />
                {!isOpen && finalResult}
                <FontAwesomeIcon icon="caret-down" className='caret'/>
            </div>

            <ul className={classnames({'open': isOpen})}>
                {isOpen && renderAnimalOptions()}
            </ul>
		</>
	);
}

export default App;