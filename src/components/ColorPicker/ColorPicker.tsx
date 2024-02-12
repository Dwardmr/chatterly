import { useState } from "react";
import {
  ChakraProvider,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Center,
  SimpleGrid,
  extendTheme,
} from "@chakra-ui/react";


interface ColorPickerProps {
  setFormColor: (color: string) => void;
}

const theme = extendTheme({
  components: {
    Popover: {
      variants: {
        picker: {
          popper: {
            maxWidth: "unset",
            width: "unset"
          }
        }
      }
    }
  }
});

const ColorPicker: React.FC<ColorPickerProps> = ({ setFormColor }: ColorPickerProps) => {
  const [color, setColor] = useState("#A0AEC0");

  const colors = [
    "#A0AEC0",
    "#E53E3E",
    "#4A5568",
    "#48BB78",
    "#4299E1",
    "#2B6CB0",
    "#D69E2E",
    "#ED8936",
    "#9F7AEA",
    "#ED64A6" 
  ];


  return (
    <ChakraProvider theme={theme}>
      <Popover variant="picker">
        <PopoverTrigger>
          <Button
            aria-label={color}
            background={color}
            height="22px"
            width="22px"
            padding={0}
            minWidth="unset"
            borderRadius={3}
          ></Button>
        </PopoverTrigger>
        <PopoverContent width="170px">
          <PopoverArrow bg={color} />
          <PopoverCloseButton color="white" />
          <PopoverHeader
            backgroundColor={color}
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            color="white"
          >
            <Center height="100%">{color}</Center>
          </PopoverHeader>
          <PopoverBody>
            <SimpleGrid columns={5} spacing={2}>
              {colors.map((c) => (
                <Button
                  key={c}
                  aria-label={c}
                  background={c}
                  height="22px"
                  width="22px"
                  padding={0}
                  minWidth="unset"
                  borderRadius={3}
                  _hover={{ background: c }}
                  onClick={() => {
                    setColor(c);
                    setFormColor(c);
                  }}
                ></Button>
              ))}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ChakraProvider>
  );
}

export default ColorPicker;
