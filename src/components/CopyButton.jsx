import { useState } from "react";
import { Button, Group, Popover, Text } from "@mantine/core";
import { Clipboard, Copy } from "tabler-icons-react";

const CopyButton = ({ copyText }) => {
  const [opened, setOpened] = useState(false);

  const _handleCopyResult = () => {
    setOpened((o) => !o);
    navigator.clipboard.writeText(copyText);
    //auto close after 1 sec
    setTimeout(() => {
      setOpened(false);
    }, 1000);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          leftIcon={<Copy size={18} />}
          onClick={_handleCopyResult}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
        >
          Copy Result
        </Button>
      }
      position="bottom"
      withArrow
      styles={{
        inner: {
          padding: "6px 8px",
        },
      }}
    >
      <Group>
        <Clipboard size={18} />
        <Text size="sm">Copied to clipboard !</Text>
      </Group>
    </Popover>
  );
};

export default CopyButton;
