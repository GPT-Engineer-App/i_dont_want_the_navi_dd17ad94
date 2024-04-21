import React, { useState } from "react";
import { ChakraProvider, Box, Flex, Text, Button, IconButton, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, useDisclosure, VStack, FormControl, FormLabel, theme, Grid, GridItem } from "@chakra-ui/react";
import { FaBars, FaUserCircle } from "react-icons/fa";

const canvasDimensions = [
  { label: "A4", value: "210mm x 297mm" },
  { label: "Letter", value: "216mm x 279mm" },
  // Add more dimensions as needed
];

const Index = () => {
  const [canvasText, setCanvasText] = useState("Your text here...");
  const [fontSize, setFontSize] = useState("20");
  const [currentStep, setCurrentStep] = useState(1);
  const [canvasSize, setCanvasSize] = useState(canvasDimensions[0].value);
  const { isOpen: isLeftOpen, onOpen: onLeftOpen, onClose: onLeftClose } = useDisclosure();
  const { isOpen: isRightOpen, onOpen: onRightOpen, onClose: onRightClose } = useDisclosure();

  const handleTextChange = (e) => setCanvasText(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);
  const handleNextStep = () => setCurrentStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
  const handlePrevStep = () => setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  const handleCanvasSizeChange = (size) => setCanvasSize(size);

  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" minH="100vh">
        {/* Navbar */}
        <Flex as="nav" justifyContent="space-between" alignItems="center" p={4} borderBottomWidth="1px">
          <IconButton variant="ghost" aria-label="Open menu drawer" icon={<FaBars />} onClick={onLeftOpen} />
          <Text fontSize="xl" fontWeight="bold">
            Worksheet Generator
          </Text>
          <IconButton variant="ghost" aria-label="Open login drawer" icon={<FaUserCircle />} onClick={onRightOpen} />
        </Flex>

        {/* Main content */}
        <Flex>
          {/* Main Content Canvas */}
          <Box flex="2" p={4}>
            <Flex alignItems="center" justifyContent="center" h="500px" border="2px" borderColor="gray.200" borderRadius="md" bg="white">
              <Box p={4} border="2px" borderColor="gray.300" borderRadius="md" style={{ width: canvasSize }}>
                <Text fontSize={`${fontSize}px`}>{canvasText}</Text>
              </Box>
            </Flex>
          </Box>

          {/* Multi-Step Sidebar */}
          <Box flex="1" bg="gray.100" p={4}>
            {currentStep === 1 && (
              <VStack spacing={4}>
                {/* Step 1: Font Size and Text Content */}
                <FormControl>
                  <FormLabel htmlFor="fontSize">Font Size</FormLabel>
                  <Input id="fontSize" type="number" value={fontSize} onChange={handleFontSizeChange} />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="canvasText">Text</FormLabel>
                  <Input id="canvasText" value={canvasText} onChange={handleTextChange} />
                </FormControl>

                <Button colorScheme="blackAlpha" onClick={() => {}} mt={4}>
                  Apply Changes
                </Button>

                {/* Navigation Controls */}
                <Flex justifyContent="space-between" width="100%" mt={4}>
                  <Button onClick={handlePrevStep} isDisabled={currentStep === 1}>
                    Previous
                  </Button>
                  <Button onClick={handleNextStep}>Next</Button>
                </Flex>
              </VStack>
            )}

            {currentStep === 2 && (
              <VStack spacing={4}>
                {/* Step 2: Canvas Layout Selection */}
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {canvasDimensions.map((dimension) => (
                    <GridItem key={dimension.label} w="100%" h="10">
                      <Button onClick={() => handleCanvasSizeChange(dimension.value)}>{dimension.label}</Button>
                    </GridItem>
                  ))}
                </Grid>

                {/* Navigation Controls */}
                <Flex justifyContent="space-between" width="100%" mt={4}>
                  <Button onClick={handlePrevStep}>Previous</Button>
                  <Button onClick={handleNextStep}>Next</Button>
                </Flex>
              </VStack>
            )}

            {/* Placeholder for Step 3 and Step 4 */}
            {currentStep === 3 && <Box>Step 3 Content</Box>}
            {currentStep === 4 && <Box>Step 4 Content</Box>}
          </Box>
        </Flex>

        {/* Left Drawer Menu */}
        <Drawer placement="left" onClose={onLeftClose} isOpen={isLeftOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>{/* Menu content goes here */}</DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Right Drawer Login */}
        <Drawer placement="right" onClose={onRightClose} isOpen={isRightOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>
            <DrawerBody>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Enter your username" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" placeholder="Enter your password" type="password" />
              </FormControl>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onRightClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Login</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
