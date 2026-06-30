import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface AvatarProps {
  url?: string;
  name?: string;
  size?: number;
  isOnline?: boolean;
}

export default function Avatar({ url, name, size = 48, isOnline }: AvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {url ? (
        <Image source={{ uri: url }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
          <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{name ? getInitials(name) : '?'}</Text>
        </View>
      )}
      
      {isOnline !== undefined && (
        <View style={[
          styles.statusIndicator, 
          { 
            backgroundColor: isOnline ? '#2ecc71' : '#bdc3c7',
            width: size * 0.25,
            height: size * 0.25,
            borderRadius: (size * 0.25) / 2,
            right: 0,
            bottom: 0,
          }
        ]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  statusIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#ffffff',
  }
});
