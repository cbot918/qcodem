eas-install:
	npm install --global eas-cli

eas:
	npx expo install expo-updates
	eas update:configure
	eas build:configure