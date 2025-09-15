import {colors} from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import {createContext, PropsWithChildren, ReactNode, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

interface ActionSheetContextValue {
  onPressOutside?: (event: GestureResponderEvent) => void;
}

const ActionSheetContext = createContext<ActionSheetContextValue | undefined>(
  undefined,
);

interface ActionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  animationType?: ModalProps['animationType'];
  hideAction: () => void;
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

function ActionMain({
  children,
  isVisible,
  animationType = 'slide',
  hideAction,
  ...props
}: ActionMainProps) {
  const onPressOutside = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) hideAction();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType}
      onRequestClose={hideAction}
      statusBarTranslucent={true}
      {...props}>
      <ActionSheetContext.Provider value={{onPressOutside}}>
        {children}
      </ActionSheetContext.Provider>
    </Modal>
  );
}

function Background({children}: PropsWithChildren) {
  const actionSheetContext = useContext(ActionSheetContext);
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <SafeAreaView
      style={styles.actionBackground}
      onTouchEnd={actionSheetContext?.onPressOutside}>
      {children}
    </SafeAreaView>
  );
}

function Container({children}: PropsWithChildren) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  return <View style={styles.actionContainer}>{children}</View>;
}

function Button({
  children,
  isDanger = false,
  isChecked = false,
  ...props
}: ButtonProps) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.actionButtonPressed,
        styles.actionButton,
      ]}
      {...props}>
      <Text style={[styles.actionText, isDanger && styles.dangerText]}>
        {children}
      </Text>

      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors[theme].BLUE_500} />
      )}
    </Pressable>
  );
}

function Title({children}: PropsWithChildren) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

function Divider() {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return <View style={styles.border} />;
}
interface FilterProps extends PressableProps {
  children: ReactNode;
  isSelected?: boolean;
}

function Filter({children, isSelected, ...props}: FilterProps) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <Pressable style={styles.filterContainer} {...props}>
      <Text style={isSelected ? styles.filterSelectedText : styles.filterText}>
        {children}
      </Text>
      <Ionicons
        name="chevron-down"
        size={22}
        color={isSelected ? colors[theme].BLUE_500 : colors[theme].GRAY_300}
      />
    </Pressable>
  );
}

interface ChceckBoxProps extends PressableProps {
  children?: ReactNode;
  icon?: ReactNode;
  isChecked?: boolean;
}

function CheckBox({
  children,
  isChecked = false,
  icon = null,
  ...props
}: ChceckBoxProps) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        pressed && styles.actionButtonPressed,
        styles.checkBoxContainer,
      ]}>
      <Ionicons
        name={isChecked ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={22}
        color={colors[theme].BLUE_500}
      />
      {icon}
      <Text style={styles.checkBoxText}>{children}</Text>
    </Pressable>
  );
}

export const ActionSheet = Object.assign(ActionMain, {
  Container,
  Button,
  Title,
  Divider,
  Background,
  Filter,
  CheckBox,
});

const styling = (theme: Theme) =>
  StyleSheet.create({
    actionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    actionContainer: {
      backgroundColor: colors[theme].GRAY_100,
      borderRadius: 15,
      marginHorizontal: 10,
      marginBottom: 10,
      overflow: 'hidden',
    },
    actionButtonPressed: {
      backgroundColor: colors[theme].GRAY_200,
    },
    actionText: {
      fontSize: 17,
      color: colors[theme].BLUE_500,
      fontWeight: '500',
    },
    dangerText: {
      color: colors[theme].RED_500,
    },
    titleContainer: {
      padding: 15,
      alignItems: 'center',
    },
    titleText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      height: 50,
    },
    border: {
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].GRAY_200,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      gap: 5,
    },
    filterText: {
      color: colors[theme].GRAY_300,
      fontSize: 15,
      fontWeight: '500',
    },
    filterSelectedText: {
      color: colors[theme].BLUE_500,
      fontSize: 15,
      fontWeight: '500',
    },
    checkBoxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      gap: 10,
      paddingHorizontal: 30,
    },
    checkBoxText: {
      color: colors[theme].BLACK,
      fontSize: 15,
    },
  });
