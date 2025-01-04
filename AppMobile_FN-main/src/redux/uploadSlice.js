import {createSlice} from '@reduxjs/toolkit';
import {postDataAPI, getDataAPI} from '../utils/fetchData';
import {SERVER_URL} from '../utils/ip';
import axios from 'axios';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    image: '',
    video: '',
  },
  reducers: {
    getImageUrl(state) {
      return state.image;
    },
    setImageUrl(state, action) {
      state.image = action.payload;
    },
    getVideoUrl(state) {
      return state.video;
    },
    setVideoUrl(state, action) {
      state.video = action.payload;
    },
  },
});

export const uploadFile = async source => {
  try {
    console.log("Starting upload with source:", source);
    const formData = new FormData();

    formData.append('file', {
      uri: source.uri,
      type: source.type,
      name: source.fileName,
    });
    formData.append('upload_preset', 'mobile_chat');
    formData.append('cloud_name', 'dxa0uwame');

    console.log("FormData created:", formData);
    
    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dxa0uwame/image/upload`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
  
    console.log("Upload successful:", response.data);
    return response.data.secure_url;
  } catch (err) {
    console.log("Upload failed. Full error:", err.response ? err.response.data : err);
    return null;
  }
};

const {actions, reducer} = uploadSlice;

export const {getImageUrl, setImageUrl, getVideoUrl, setVideoUrl} = actions;

export default reducer;
