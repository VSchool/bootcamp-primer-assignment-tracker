import { Icon } from "./Icon"

export const Accordion = ({ children, title, open, toggleIsExpanded, disabled, icon }) => {
    return (
        <div className="accordion">
            <div className={`accordion-header ${disabled ? '--disabled' : ''}`} onClick={disabled ? () => { } : toggleIsExpanded}>
                <div className="accordion-header-title">
                    {icon && <Icon name={icon} />}
                    <span>{title}</span>
                </div>
                <Icon name={open ? "up" : "down"} />
            </div>
            <div className={`accordion-body ${open ? '--open' : ''}`}>
                {open && children()}
            </div>
        </div>
    )
}