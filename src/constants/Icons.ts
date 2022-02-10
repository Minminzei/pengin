import { MaterialCommunityIcons } from '@expo/vector-icons'

const Icons: {
  [index: string]: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
} = {
  people: 'account-multiple-outline',
  setting: 'cog-outline',
  location: 'map-marker-outline',
  close: 'close',
  image: 'folder-multiple-image',
};

export default Icons;
