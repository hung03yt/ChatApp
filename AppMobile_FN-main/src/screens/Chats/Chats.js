import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@components/Header/Header';
import SearchBox from '@components/SearchBox/SearchBox';
import StorySlider from '@components/StorySlider/StorySlider';
import {images} from '@images';
import {getUserInfo} from '@redux/userSlice';
import {getDataAPI} from '@utils/fetchData';
import {styles} from './Chat.styles';
import UserListing from './UserListing/UserListing';
import moment from 'moment';
import {fetchConversations} from '@redux/conversationSlice';
import {socket} from '@utils/socket';

const Chats = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const users = useSelector(state => state.user.users);
  const conversations = useSelector(state => state.conversation.conversations);

  const [loggedUser, setLoggedUser] = useState({});
  const [lastMessages, setLastMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const loggedUser = users.filter(user => user._id === auth?.id)[0];

    setLoggedUser(loggedUser);
  }, [auth?.id, users]);

  const formatTime = time => {
    const dateConvert = new Date(time);
    const start = new Date(time).getTime();
    const end = new Date(Date.now()).getTime();
    const milliseconds = Math.abs(end - start).toString();
    const seconds = parseInt(milliseconds / 1000, 10);
    const minutes = parseInt(seconds / 60, 10);
    const hours = parseInt(minutes / 60, 10);
    const days = parseInt(hours / 24, 10);

    if (days > 7) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return months[dateConvert.getMonth()] + ' ' + dateConvert.getDate();
    } else if (days <= 7) {
      if (dateConvert.getDate() !== new Date().getDate()) {
        const weekday = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        return weekday[dateConvert.getDay()];
      } else {
        return moment(time).format('HH:mm');
      }
    }
  };

  useEffect(() => {
    const getLastMess = async () => {
      const res1 = await getDataAPI('message/last', auth.token);

      const mapMess = conversations.map(e => e._id);

      const lastMess = res1.data.lastMessages
        .filter(mess => mapMess.includes(mess._id))
        .map(e => ({
          ...e,
          createdAt: formatTime(e.createdAt),
        }));

      setLastMessages(lastMess);
    };

    getLastMess();
    // dispatch(setLastMessages(lastMess));
  }, [conversations]);

  useEffect(() => {
    socket.on('last_message', data => {
      const newLastMsgs = lastMessages.map(e => {
        if (e._id === data.room) {
          return {
            _id: data.room,
            content: data.message,
            msgType: data.type,
            senderId: data.idUser,
            createdAt: formatTime(Date.now()),
          };
        } else {
          return e;
        }
      });

      setLastMessages(newLastMsgs);
    });

    return () => {
      socket.off('receive_last_msg');
    };
  }, [socket, lastMessages]);

  useEffect(() => {
    dispatch(fetchConversations(auth.id, auth.token));
  }, [auth]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        heading="Chats"
        icon1={images.take_photo}
        icon2={images.new_grchat}
        navigation={navigation}
        loggedUser={loggedUser}
      />
  
      <View style={styles.searchBoxContainer}>
        <SearchBox navigation={navigation} userStore={users} auth={auth} />
      </View>
  
      <View style={styles.userListingContainer}>
        <UserListing navigation={navigation} lastMessages={lastMessages} />
      </View>
    </SafeAreaView>
  );
  
};

export default Chats;
