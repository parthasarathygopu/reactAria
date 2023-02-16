import React from 'react';
import {useTooltipTriggerState} from 'react-stately';
import {mergeProps, useTooltip, useTooltipTrigger} from 'react-aria';

function Tooltip({ state, ...props }) {
  let { tooltipProps } = useTooltip(props, state);

  return (
    <span
      style={{
        position: 'absolute',
        left: '5px',
        top: '100%',
        maxWidth: 150,
        marginTop: '10px',
        backgroundColor: 'white',
        color: 'black',
        padding: '5px',
        border: '1px solid gray'
      }}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  );
}

export function TooltipButton(props) {
  let state = useTooltipTriggerState(props);
  let ref = React.useRef();

  // Get props for the trigger and its tooltip
  let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  return (
    <span style={{ position: 'relative' }}>
      <div
        ref={ref}
        {...triggerProps}
      >
        {props.children}
      </div>
      {state.isOpen &&
        <Tooltip state={state} {...tooltipProps}>{props.tooltip}</Tooltip>}
    </span>
  );
}