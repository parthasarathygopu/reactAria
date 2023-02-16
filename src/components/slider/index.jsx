import React from 'react';
import {useSliderState} from 'react-stately';
import {
  mergeProps,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden
} from 'react-aria';
import {TooltipButton } from "../tooltip/index"

export function Slider(props) {
    let trackRef = React.useRef(null);
    let numberFormatter = useNumberFormatter(props.formatOptions);
    let state = useSliderState({ ...props, numberFormatter });
    let { groupProps, trackProps, labelProps, outputProps } = useSlider(
      props,
      state,
      trackRef
    );
  
    return (
      <div
        {...groupProps}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 300,
          touchAction: "none"
        }}
      >
        {/* Create a flex container for the label and output element. */}
        <div style={{ display: "flex", alignSelf: "stretch" }}>
          {props.label && <label {...labelProps}>{props.label}</label>}
          <output {...outputProps} style={{ flex: "1 0 auto", textAlign: "end" }}>
            {state.getThumbValueLabel(0)}
          </output>
        </div>
        {/* The track element holds the visible track line and the thumb. */}
        <div
          {...trackProps}
          ref={trackRef}
          style={{
            position: "relative",
            height: 30,
            width: " 100%"
          }}
        >
          <div
            style={{
              position: "absolute",
              backgroundColor: "gray",
              height: 3,
              top: 13,
              width: "100%"
            }}
          />
          <Thumb index={0} state={state} trackRef={trackRef} />
        </div>
        <div style={{ display: "flex", alignSelf: "stretch", justifyContent: "space-between"
 }}>
          <div>{props.minValue}</div>
          <div>{props.maxValue}</div>
        </div>
      </div>
    );
  }
  


  function Thumb(props) {
    let { state, trackRef, index } = props;
    let inputRef = React.useRef(null);
    let { thumbProps, inputProps } = useSliderThumb(
      {
        index,
        trackRef,
        inputRef
      },
      state
    );
  
    let { focusProps, isFocusVisible } = useFocusRing();
    return (
      <div
        style={{
          position: "absolute",
          top: 4,
          transform: "translateX(-50%)",
          left: `${state.getThumbPercent(index) * 100}%`
        }}
      >
        <TooltipButton tooltip={state.getThumbValueLabel(0)}>
        <div
          {...thumbProps}
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: isFocusVisible
              ? "orange"
              : state.isThumbDragging(index)
              ? "dimgrey"
              : "gray"
          }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
          </VisuallyHidden>
        </div>
        </TooltipButton>
      </div>
    );
  }
