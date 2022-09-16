import React from "react";

export const Tooltip = React.forwardRef<HTMLDivElement,any>(
    ({children, ...props}, ref) => {
        const {top,left, ...rest} = props
        return (
            <div style={{
                transition: "all 0.2s",
                position: "absolute",
                top,
                left
            }}>
                <div className="tooltip" ref={ref} {...rest} >
                    {children}
                </div>
            </div>
        );
    }
);
