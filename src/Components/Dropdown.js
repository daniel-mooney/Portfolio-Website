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
    const transCSS = `
        .drop-container${id.current}-open$ {
            height: ${childHeight}px
        }

        .drop-container${id.current}-enter{
            height: 0px;
        }
        
        .drop-container${id.current}-enter-active {
            height: ${childHeight}px;
            transition: height 300ms;
        }
        
        .drop-container${id.current}-exit {
            height: ${childHeight}px;
        }
        
        .drop-container${id.current}-exit-active {
            height: 0px;
            transition: height 300ms;
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
                    timeout={300}
                >
                    <div id={id.current} ref={trans} className={`drop-container-${drop ? 'open' : 'closed'}`}>
                        <div style={{padding: '0.7rem'}}>
                            {props.children}
                        </div>
                    </div>

                </CSSTransition>
                
            </div>
        </>
            
    );
}