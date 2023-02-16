import * as React from "react";
import { useComboBoxState } from "@react-stately/combobox";
import { useComboBox } from "@react-aria/combobox";
import { useFilter } from "@react-aria/i18n";
import { useButton } from "react-aria";

import { ListBox } from "../list/index";
import { Popover } from "../popover/index";

export function ComboBox(props) {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let buttonRef = React.useRef(null);
  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);

  let {
    buttonProps: triggerProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef
    },
    state
  );

  let { buttonProps } = useButton(triggerProps, buttonRef);

  return (
    <div className="inline-flex flex-col relative">
      <label
        {...labelProps}
        className="block text-sm font-medium text-gray-700 text-left"
      >
        {props.label}
      </label>
      <div
        className={`relative inline-flex flex-row rounded-md overflow-hidden shadow-sm border-2 ${
          state.isFocused ? "border-pink-500" : "border-gray-300"
        }`}
      >
         <input
         ref={inputRef}
          type="text"
          name="currency"
          className="outline-none px-3 py-1"
          value={props.currencyValue}
          onChange={props.onCurrencyValueChange}
          id="currency"
          placeholder="Currency"
        />
        <button
          {...buttonProps}
          ref={buttonRef}
          className={`px-1 bg-gray-100 cursor-default border-l-2 ${
            state.isFocused
              ? "border-pink-500 text-pink-600"
              : "border-gray-300 text-gray-500"
          }`}
        >
            {props.selectedKey}
        </button>
      </div>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </div>
  );
}
