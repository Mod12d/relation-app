import { Button } from "@mantine/core";

export const MainButtons = () => {
  const handleOnClickUpload = () => {
    alert("uploaded!");
  };
  const handleOnClickAdvanced = () => {
    alert("This is advanced");
  };
  const handleOnClickRestart = () => {
    alert("restarted!");
  };
  return (
    <div className="flex flex-col justify-end sm:w-1/4 sm:flex-row">
      <Button
        color="indigo"
        variant="outline"
        size="xs"
        className="mr-1 mb-1"
        onClick={handleOnClickUpload}
      >
        Upload
      </Button>
      <Button
        color="indigo"
        variant="outline"
        size="xs"
        className="mr-1 mb-1"
        onClick={handleOnClickAdvanced}
      >
        Advanced
      </Button>
      <Button
        color="indigo"
        variant="outline"
        size="xs"
        onClick={handleOnClickRestart}
      >
        Restart
      </Button>
    </div>
  );
};
