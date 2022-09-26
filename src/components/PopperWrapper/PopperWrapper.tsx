import ReactDOM from "react-dom";
import React, {FC, PropsWithChildren, ReactElement} from "react";
import {usePopperTooltip} from "react-popper-tooltip";
import classNames from "classnames";
import * as PopperJS from "@popperjs/core";
import "react-popper-tooltip/dist/styles.css";
import styles from "./PopperWrapper.module.scss";

export interface IPopper {
    popper: ReactElement;
    popperClasses?: string;
    placement?: PopperJS.Placement;
    visible: boolean,
    closeOnOutsideClick?: boolean,
    onVisibleChange: ((state: boolean) => void) | undefined
}

const PopperWrapper: FC<PropsWithChildren<IPopper>> = ({
                                                           children, visible,
                                                           onVisibleChange, popperClasses,closeOnOutsideClick=false, popper, placement = "top"
                                                       }) => {


    const {getTooltipProps, setTooltipRef, setTriggerRef} = usePopperTooltip({
        placement: placement,
        trigger: 'click',
        interactive: true,
        visible: visible,
        closeOnOutsideClick: closeOnOutsideClick,
        onVisibleChange: onVisibleChange,
    });
    return (
        <>
            <div className={classNames(popperClasses)} ref={setTriggerRef}>
                {popper}
            </div>

            {popper &&
                visible &&
                ReactDOM.createPortal(
                    <div ref={setTooltipRef} {...getTooltipProps({className: styles.tooltipContainer})}>
                        {children}
                    </div>,
                    document.body
                )}
        </>
    );
};

export default PopperWrapper
