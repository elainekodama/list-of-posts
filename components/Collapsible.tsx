import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export function Collapsible({ openHeader, closedHeader, children }: PropsWithChildren & { openHeader: string, closedHeader: string, previewText: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useColorScheme() ?? 'light';

  return (
    <>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.softerText : Colors.dark.softerText}
        />
        <ThemedText type="smallSubtitle">
          {isOpen ? openHeader : closedHeader}
        </ThemedText>

      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginLeft: 24,
    marginVertical: 8
  }
});
