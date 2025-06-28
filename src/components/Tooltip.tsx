import { JSX } from "react";

type TooltipProps = {
    tooltipText: string | undefined;
    children: React.ReactNode;
};

export function Tooltip({ tooltipText, children }: TooltipProps): JSX.Element {

    console.log("TTP ", tooltipText)
    if (!tooltipText) {
        return <>{children}</>;
    }
    return (
        <div className="tooltip-wrapper">
            {children}
            <span className="tooltip-text">{tooltipText}</span>
        </div>
    )
}