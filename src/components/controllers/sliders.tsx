import { Slider } from "@mantine/core";

export const ZoomSlider = () => {
  return (
    <div className="w-11/12">
      Zoom:
      <Slider
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
      />
    </div>
  );
};
export const SpacingSlider = () => {
  return (
    <div className="w-11/12">
      Spacing:
      <Slider
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
      />
    </div>
  );
};
