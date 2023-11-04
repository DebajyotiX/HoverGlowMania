function hexToRGB(hexString) {
    // Remove leading '#' character
    hexString = hexString.replace(/^#/, '');

    // Parse hexString string into normalized components
    const red = parseInt(hexString.slice(0, 2), 16) / 255;
    const green = parseInt(hexString.slice(2, 4), 16) / 255;
    const blue = parseInt(hexString.slice(4, 6), 16) / 255;

    return { r: red, g: green, b: blue };
}

export { hexToRGB };