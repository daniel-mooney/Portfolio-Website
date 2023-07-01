import React, {useState, useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import "./dropdown.css";

export default function Dropdown(props) {
    const [drop, setDrop] = useState(false);
    const childElements = useRef(null);

    function toggleDropdown() {
        setDrop(!drop);
    }

    const childHeight = childElements.current != null ? childElements.current.scrollHeight | 0 : 0;
    const transCSS = `
        .drop-container-open {
            height: ${childHeight}px
        }

        .drop-container-enter{
            height: 0px;
        }
        
        .drop-container-enter-active {
            height: ${childHeight}px;
            transition: height 300ms;
        }
        
        .drop-container-exit {
            height: ${childHeight}px;
        }
        
        .drop-container-exit-active {
            height: 0px;
            transition: height 300ms;
        }
    `
    return (
        <>
            <div className='content-container'>
                <style>{transCSS}</style>
                <div className='tab'>
                    <h2 style={{margin: '0'}}>{props.name}</h2>
                    <button className='drop-button' onClick={toggleDropdown}>{drop ? '-' : '+'}</button>
                </div>
                <CSSTransition
                    classNames="drop-container"
                    nodeRef={childElements}
                    in={drop}
                    timeout={300}
                >
                    <div ref={childElements} className={`drop-container-${drop ? 'open' : 'closed'}`}>
                        {props.children}
                    </div>

                </CSSTransition>
                
            </div>
        </>
            
    );
}