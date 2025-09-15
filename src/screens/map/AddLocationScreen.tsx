import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {MapStackParamList} from '@/types/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import useForm from '@/hooks/useForm';
import {validateAddPost} from '@/utils/validation';
import useGetAddress from '@/hooks/useGetAddress';
import DatePicker from 'react-native-date-picker';
import {getDateWithSeparator} from '@/utils/date';
import MarkerColorInput from '@/components/post/MarkerColorInput';
import {colors} from '@/constants/colors';
import ScoreInput from '@/components/post/ScoreInput';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImageInput from '@/components/post/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import PreviewImageList from '@/components/common/PreviewImageList';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import {useNavigation} from '@react-navigation/native';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

const AddLocationScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const {location} = route.params;
  const [openDate, setOpenDate] = useState(false);
  const imagePicker = useImagePicker({initialImages: []});
  const address = useGetAddress(location);
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  console.log(address);
  usePermission('PHOTO');
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors[theme].PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });
  const createPost = useMutateCreatePost();

  const handleSubmit = () => {
    createPost.mutate(
      {
        address,
        ...location,
        ...postForm.values,
        imageUris: imagePicker.imageUris,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: inset.bottom + 100},
        ]}>
        <InputField disabled value={address} />
        <CustomButton
          variant="outlined"
          label={getDateWithSeparator(postForm.values.date, '. ')}
          onPress={() => setOpenDate(true)}
        />
        <InputField
          placeholder="제목을 입력하세요"
          error={postForm.errors.title}
          touched={postForm.touched.title}
          {...postForm.getTextInputProps('title')}
        />
        <InputField
          multiline
          placeholder="내용을 입력하세요"
          error={postForm.errors.description}
          touched={postForm.touched.description}
          {...postForm.getTextInputProps('description')}
        />
        <MarkerColorInput
          color={postForm.values.color}
          score={postForm.values.score}
          onChangeColor={value => postForm.onChange('color', value)}
        />
        <ScoreInput
          score={postForm.values.score}
          onChangeScore={value => postForm.onChange('score', value)}
        />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          title={null}
          cancelText="취소"
          confirmText="완료"
          date={postForm.values.date}
          open={openDate}
          onCancel={() => setOpenDate(false)}
          onConfirm={date => {
            postForm.onChange('date', date);
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <ImageInput onChange={imagePicker.handleChangeImage} />
          <PreviewImageList
            imageUris={imagePicker.imageUris}
            onDelete={imagePicker.deleteImageUri}
            showDeleteButton={true}
          />
        </View>
      </ScrollView>
      <FixedBottomCTA label="저장" onPress={() => handleSubmit()} />
    </>
  );
};

export default AddLocationScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 20,
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
  });
