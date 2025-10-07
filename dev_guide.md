# DEV Guide

## Information

App Links:

1. Android: https://play.google.com/store/apps/details?id=com.solheaven.android&hl=en_US
2. IOS: https://apps.apple.com/th/app/globiance/id1584923932

Web App Links:

1. Production: https://exchange.globiance.com
2. UAT: https://v2.globiance.dev

Setup:

node_version : v14.17.0
npm_version : 6.14.13

1. `npm i` / `yarn install`
2. Pods
   1. `cd ios`
   2. `pod install`
3. Set environment
   1. Production
   2. `npx gulp set --env=prod`
   3. UAT
      1. `npx gulp set --env=dev`
4. Run Android: `npx react-native run-android`
5. Run Ios: `npx react-native run-ios`

## Contribution

### PR

1. Default / Production branch: `UI_v2`
2. Each new release will require its own branch & a PR into default branch for making it live

### Testing

1. Test out the feature / update in android and IOS devices - either by emulators or physical devices
2. There are also testing tracks & testflight made available for internal testing before release

### Semantics

1. No plain text must be used anywhere in code - all the text must come from using the `strings()` function which sources its text files from the following directory [locales](./App/locales/)
2. Be aware of the 5 app themes & to use the theme color / hightlight color in the screens as it fits.
3. Comment code whenever deemed necessary
