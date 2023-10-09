import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 812;

const horizontalScale = (size) => (width / baseWidth) * size;
const verticalScale = (size) => (height / baseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };