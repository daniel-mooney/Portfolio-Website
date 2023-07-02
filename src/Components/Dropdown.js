import React, {useState, useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import { v4 } from 'uuid';
import "./dropdown.css";

export default function Dropdown(props) {
    
    const [drop, setDrop] = useState(false);
    const trans = useRef(null);
    const id = useRef(v4())

    const childElements = document.getElementById(id.current)
    const childHeight = childElements != null ? childElements.scrollHeight : 0
    const childOffsetHeight = childElements != null ? childElements.offsetHeight : 0

    const transitionSpeed = props.transitionSpeed || 400;        // in milliseconds
    const transCSS = `
        .drop-container${id.current}-open$ {
            height: ${childHeight}px
        }

        .drop-container${id.current}-enter{
            height: ${childOffsetHeight}px;
        }
        
        .drop-container${id.current}-enter-active {
            height: ${childHeight}px;
            transition: height ${transitionSpeed}ms;
        }
        
        .drop-container${id.current}-exit {
            height: ${childOffsetHeight}px;
        }
        
        .drop-container${id.current}-exit-active {
            height: 0px;
            transition: height ${transitionSpeed}ms;
        }
    `

    function toggleDropdown() {
        setDrop(!drop);
    }

    return (
        <>
            <div className='content-container'>
                <style>{transCSS}</style>
                <div className='tab'>
                    <h2 style={{margin: '0'}}>{props.name}</h2>
                    <button className='drop-button' onClick={toggleDropdown}>{drop ? '-' : '+'}</button>
                </div>
                <CSSTransition
                    classNames={`drop-container${id.current}`}
                    nodeRef={trans}
                    in={drop}
                    timeout={transitionSpeed}
                >
                    <div id={id.current} ref={trans} className={`drop-container-${drop ? 'open' : 'closed'}`}>
                        {props.children}
                    </div>
                </CSSTransition>
                
            </div>
        </>        
    );
}