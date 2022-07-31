import {View, Text, TouchableOpacity} from 'react-native';
import React, {forwardRef} from 'react';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import CameraIcon from '../../../assets/icons/camera.svg';
import GalleryIcon from '../../../assets/icons/gallery.svg';
import ImagePickerCropper from 'react-native-image-crop-picker';

const ImagePicker = forwardRef(({onFileSelected}, ref) => {
  const WIDTH_ICON = 25;
  const HEIGH_ICON = 25;

  const options = [
    {
      name: 'Take from camera',
      icon: <CameraIcon name="camera" width={WIDTH_ICON} height={HEIGH_ICON} />,
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {});
      },
    },
    {
      name: 'Choose from gallery',
      icon: (
        <GalleryIcon name="gallery" width={WIDTH_ICON} height={HEIGH_ICON} />
      ),
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
  ];

  console.log(options);

  return (
    <RBSheet
      ref={ref}
      height={150}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}>
      <View style={styles.optionWrapper}>
        {options.map(({name, onPress, icon}) => {
          return (
            <TouchableOpacity
              style={styles.pickerOption}
              onPress={onPress}
              key={name}>
              {icon}
              <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </RBSheet>
  );
});

export default ImagePicker;
