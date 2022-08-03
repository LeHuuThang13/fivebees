import {createDrawerNavigator} from '@react-navigation/drawer';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const {authDispatch} = useContext(GlobalContext);

  const DrawerContents = (navigation, authDispatch) => {
    return <SideMenu navigation={navigation} authDispatch={authDispatch} />;
  };
};

export default DrawerNavigator;
