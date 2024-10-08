// NotificationScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';

// Sample Notification Data
const initialNotifications = [
  {
    id: '1',
    type: 'message',
    title: 'New Message from Posco',
    description: 'Hey! Are you available for a meeting tomorrow?',
    timestamp: '2024-08-29T10:30:00Z',
    isRead: false,
    avatar: 'https://refuel.site/projects/socialzoo/admin/upload/pet1726134296.jpeg',
  },
  {
    id: '2',
    type: 'friend_request',
    title: 'Alice sent you a friend request',
    description: '',
    timestamp: '2024-09-13T14:20:00Z',
    isRead: true,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    type: 'promotion',
    title: '50% Off on Premium Membership!',
    description: 'Upgrade now and enjoy exclusive benefits.',
    timestamp: '2024-06-23T09:15:00Z',
    isRead: false,
    avatar: '', // No avatar for promotions
  },
  // Add more notifications as needed
];

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [refreshing, setRefreshing] = useState(false);

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    Alert.alert('Success', 'All notifications have been marked as read.');
  };

  // Function to handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new notifications
    setTimeout(() => {
      // For demonstration, we'll reset read status
      const refreshedNotifications = notifications.map((notif) => ({
        ...notif,
        isRead: true,
      }));
      setNotifications(refreshedNotifications);
      setRefreshing(false);
      Alert.alert('Refreshed', 'Notifications have been refreshed.');
    }, 2000);
  };

  // Function to delete a notification
  const deleteNotification = (id) => {
    const newData = notifications.filter((item) => item.id !== id);
    setNotifications(newData);
    Alert.alert('Deleted', 'Notification has been deleted.');
  };

  // Function to toggle read/unread status
  const toggleReadStatus = (id) => {
    const updatedNotifications = notifications.map((notif) => {
      if (notif.id === id) {
        return { ...notif, isRead: !notif.isRead };
      }
      return notif;
    });
    setNotifications(updatedNotifications);
  };

  // Render function for each notification item
  const renderItem = (data) => <NotificationItem notification={data.item} />;

  // Render function for hidden swipe actions
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* Mark as Read/Unread Button */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => toggleReadStatus(data.item.id)}
      >
        <Ionicons
          name={data.item.isRead ? 'eye-off-outline' : 'eye-outline'}
          size={24}
          color="#000"
        />
        <Text style={styles.backTextWhite}>
          {data.item.isRead ? 'Mark Unread' : 'Mark Read'}
        </Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteNotification(data.item.id)}
      >
        <Ionicons name="trash-outline" size={24} color="#f01e2c" />
        <Text style={[styles.backTextWhite,{color:'#f01e2c'}]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Mark All as Read</Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <View>
      <SwipeListView
        data={notifications}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        disableRightSwipe
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      </View>
     

      {/* Empty State */}
      {notifications.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={64}
            color="#ccc"
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.emptyText}>No Notifications</Text>
        </View>
      )}
    </View>
  );
};

// Notification Item Component within the same file
const NotificationItem = ({ notification }) => {
  const { type, title, description, timestamp, isRead, avatar } = notification;

  // Function to get the appropriate icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'message':
        return (
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="#4CAF50"
          />
        );
      case 'friend_request':
        return (
          <MaterialIcons name="person-add" size={24} color="#2196F3" />
        );
      case 'promotion':
        return (
          <Ionicons name="pricetag-outline" size={24} color="#FF9800" />
        );
      default:
        return (
          <Ionicons name="notifications-outline" size={24} color="#757575" />
        );
    }
  };

  return (
    <View
      style={[styles.notificationContainer, !isRead && styles.unreadContainer]}
    >
      {/* Icon or Avatar */}
      <View style={styles.iconContainer}>
        {type === 'message' && avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          getIcon()
        )}
      </View>

      {/* Notification Text */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, !isRead && styles.unreadTitle]}>
          {title}
        </Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        <Text style={styles.timestamp}>
          {moment(timestamp).fromNow()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  // Header Styles
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
fontFamily:'Poppins-Bold'
  },
  markAllText: {
    fontSize: 12,
    color: '#fff',
    fontFamily:'Poppins-Regular'
  },

  // Notification Item Styles
  notificationContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  unreadContainer: {
    backgroundColor: '#e6f7ff',
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#333',
  fontFamily:'Poppins-SemiBold'
  },
  unreadTitle: {
    // fontWeight: '700',
    fontFamily:'Poppins-SemiBold'
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    fontFamily:'Poppins-Regular'

  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontFamily:'Poppins-Regular'

  },

  // Swipe Hidden Actions Styles
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    marginBottom: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    // backgroundColor: '#f5f5f5',
    right: 75,
  },
  backRightBtnRight: {
    // backgroundColor: '#f01e2c',
    right: 0,
  },
  backTextWhite: {
    color: '#000',
    fontSize: 10,
    marginTop: 4,
    fontFamily:'Poppins-Regular'
  },
  TextWhite: {
    color: '#fff',
    fontSize: 10,
    marginTop: 4,
    fontFamily:'Poppins-Regular'
  },

  // Empty State Styles
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
});

export default Notification;
