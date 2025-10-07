declare module '*.svg?inline' {
  const content: any;
  export default content;
}
declare module '*.svg' {
  import Svg from 'react-native-svg';

  const content: Svg;
  export default content;
}
