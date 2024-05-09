import { Icon } from "./Icon"

export const Accordion = ({ children, heading, open, toggleIsExpanded, disabled }) => {
    return (
        <div className="accordion">
            <div className={`accordion-header ${disabled ? '--disabled' : ''}`} onClick={disabled ? () => { } : toggleIsExpanded}>
                {heading}
                <Icon name={open ? "down" : "up"} />
            </div>
            <div className={`accordion-body ${open ? '--open' : ''}`}>
                {children}
            </div>
        </div>
    )
}