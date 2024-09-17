import { Post } from "@/models/Post";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { PatientPost } from "./PatientPost";
import { useThemeColor } from "@/hooks/useThemeColor";

type PostDetailsModalProps = {
    post: Post | null,
    isVisible: boolean,
    onClose: () => void,
    updateHugNumberHandler: (postUrl: string, newNumHugs: number) => Promise<void>
};
export function PostDetailsModal({ post, isVisible, onClose, updateHugNumberHandler }: PostDetailsModalProps) {
    const listItemBackground = useThemeColor({}, 'card');

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContainer, { backgroundColor: listItemBackground }]}>
                            {post &&
                                <PatientPost
                                    previewOnly={false}
                                    post={post}
                                    onHugNumberChange={() => updateHugNumberHandler(post.post_url, post.num_hugs)} />
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    },
    modalContainer: {
        width: '80%',
        maxHeight: '80%',
        borderRadius: 8,
        alignItems: 'center',
    },
})