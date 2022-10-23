import { NumberInput, Radio } from "@mantine/core";
import { useState } from "react";

export const ShowControl = () => {
  const [value, setValue] = useState("Show All");
  const disabled = value === "Show Top" ? false : true;

  return (
    <>
      <div>
        <Radio.Group
          color="indigo"
          className="whitespace-nowrap"
          value={value}
          onChange={setValue}
        >
          <Radio label="Show All" value="Show All" />
          <Radio label="Show Friends" value="Show Friends" />
          <Radio label="Show Top" value="Show Top" />
        </Radio.Group>
      </div>
      <div className="w-[55px] md:ml-3">
        <NumberInput
          defaultValue={50}
          placeholder="number of followers"
          radius="md"
          size="xs"
          disabled={disabled}
          required
        />
      </div>
    </>
  );
};
