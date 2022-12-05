// https://www.electronforge.io/guides/create-and-add-icons
const path = require('path');

const platform = process.platform !== 'darwin' ? 'win' : 'mac';

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, `./src/icons/${platform}/icon`)
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: path.join(__dirname, `./src/icons/${platform}/icon.ico`),
        setupIcon: path.join(__dirname, `./src/icons/${platform}/icon.ico`)
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.join(__dirname, './src/icons/png/1024x1024.png')
        }
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ]
};
