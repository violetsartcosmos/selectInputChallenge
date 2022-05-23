import './Css/App.css';
import React, { useState } from 'react'
import classnames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCat, faDog, faDragon, faFish, faCow, faHorse, faSpider, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const animals = [
    "cat",
    "dog",
    "dragon",
    "fish",
    "cow",
    "horse",
    "spider",
];

library.add( faCat, faDog, faDragon, faFish, faCow, faHorse, faSpider, faCaretDown);

function Option ({animal, onClick}) {
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

function App() {
    const [inputVal, setInputVal] = useState("");
    const [isOpen, changeOpen] = useState(false);
    const [finalResult, changeFinalResult] = useState("");


    const onChange = (event) => {
        setInputVal(event.target.value);
        if(finalResult) changeFinalResult("");
    }

    const inputOnClick = (event) => {
        if(!isOpen) changeOpen(true);
    }
    
    const onClick = (event) => {
        console.log('element', event.target.dataset);
        const final = animals.find((animal => animal === event.target.dataset.value));
        changeOpen(false);
        changeFinalResult((
            <div className='final'>{final} <FontAwesomeIcon icon={final} /></div>
        ));
        setInputVal(final);
    }

    const renderOptions = () => {
        return animals.map((animal) => {
            if(animal.includes(inputVal)) {
                return (<Option animal={animal} onClick={(animal) => onClick(animal)} key={animal} />);
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

            <ul className={classnames({'open': isOpen || finalResult})}>
                {isOpen && renderOptions()}
            </ul>
		</>
	);
}

export default App;