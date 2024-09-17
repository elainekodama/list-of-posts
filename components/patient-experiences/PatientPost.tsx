import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconButton } from "../IconButton";
import { Post } from "@/models/Post";
import { getRelativeDateString } from "@/constants/Helpers";
import { Collapsible } from "../Collapsible";
import { patientPostStrings } from "@/constants/Strings";
import { ScrollView } from "react-native-gesture-handler";
import { PostComment } from "@/models/PostComment";

type PatientPostProps = {
    post: Post,
    previewOnly: boolean,
    onHugNumberChange: (postUrl: string, newNumHugs: number) => Promise<void>;
};
export function PatientPost({ post, previewOnly, onHugNumberChange }: PatientPostProps) {
    const [hugged, setHugged] = useState<boolean>(false);
    const background = useThemeColor({}, 'card');
    const notHuggedColor = {
        light: Colors.dark.softerText,
        dark: Colors.dark.softerText
    }
    const huggedColor = {
        light: Colors.dark.pinkAccent,
        dark: Colors.dark.pinkAccent
    }

    /**
     * Update displayed number of hugs
     */
    function pressHugHandler() {
        // was hugged before
        if (hugged) {
            post.num_hugs--;
        } else {
            // was not hugged before
            post.num_hugs++;
        }
        setHugged(!hugged);
        onHugNumberChange(post.post_url, post.num_hugs);
    }

    /**
     * Add comment or reply
     */
    function addComment(commentId: string) {
        // TODO
    }

    /**
     * Group comments by parent ID
     * @param comments
     * @returns 
     */
    const groupCommentsByParent = (comments: { [key: string]: PostComment }) => {
        const groupedComments: { [key: number]: PostComment[] } = {};

        // Sort comments by their ID ascending order
        const sortedComments = Object.entries(comments)
            .map(([key, comment]) => comment)
            .sort((a, b) => a.id - b.id);

        sortedComments.forEach(comment => {
            const parentId = comment.parent_id;
            // parent comment has not been added yet
            if (!groupedComments[parentId || 0]) {
                groupedComments[parentId || 0] = [];
            }
            // push child comment
            groupedComments[parentId || 0].push(comment);
        });

        return groupedComments;
    };

    /**
     * Recursive function to display comments and their replies
     * Need to think about how to render deep child comments/replies
     * @param parentId
     * @param level 
     * @returns 
     */
    const renderComments = (parentId: number | null = null, level: number = 0) => {
        const parentComments = groupedComments[parentId || 0] || [];

        return parentComments.map(comment => (
            <View key={comment.id} style={{ marginVertical: level === 0 ? '1%' : '0%' }}>
                {/* Top level comment */}
                {level === 0 ? (
                    <View style={{ gap: 8 }}>
                        <View>
                            <ThemedText type="defaultSemiBold">
                                {comment.display_name}
                            </ThemedText>
                            <ThemedText type="smallSubtitle" lightColor={"#00000075"} darkColor={"#00000075"}>
                                {getRelativeDateString(comment.created_at)}
                            </ThemedText>
                        </View>
                        <ThemedText type="default" lightColor={Colors.light.softerText} darkColor={Colors.dark.softerText}>
                            {comment.text}
                        </ThemedText>
                        {/* Render replies */}
                        {renderComments(comment.id, level + 1)}
                    </View>
                ) : (
                    // Replies will be collapsible and indented
                    <Collapsible
                        openHeader={patientPostStrings.hideReplies}
                        closedHeader={patientPostStrings.viewReplies}
                        previewText={
                            <ThemedText type="subtitle">
                                {patientPostStrings.viewReplies}
                            </ThemedText>
                        }>
                        <View>
                            <ThemedText type="defaultSemiBold">
                                {comment.display_name}
                            </ThemedText>
                            <ThemedText type="smallSubtitle" lightColor={"#00000075"} darkColor={"#00000075"}>
                                {getRelativeDateString(comment.created_at)}
                            </ThemedText>
                        </View>
                        <ThemedText type="default" lightColor={Colors.light.softerText} darkColor={Colors.dark.softerText}>
                            {comment.text}
                        </ThemedText>
                        {/* Render replies */}
                        {renderComments(comment.id, level + 1)}
                    </Collapsible>
                )}
            </View>
        ));
    };

    /**
     * Comments that are grouped for display
     */
    const groupedComments = groupCommentsByParent(post.comments);

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={[styles.container, { backgroundColor: background }]}>
                {/* Header */}
                <View style={{ gap: 8 }}>
                    <ThemedText type="title">
                        {post.title}
                    </ThemedText>
                    <View style={styles.commentInfoContainer}>
                        <ThemedText type="subtitle" lightColor={Colors.light.softerText} darkColor={Colors.dark.softerText}>
                            {post.getPatientDescription()}
                        </ThemedText>
                        <ThemedText type="subtitle" lightColor={Colors.light.softerText} darkColor={Colors.dark.softerText}>
                            {getRelativeDateString(post.created_at)}
                        </ThemedText>
                    </View>
                </View>
                {/* Preview of description */}
                {previewOnly ?
                    (<View style={styles.content}>
                        <ThemedText type="defaultSemiBold">
                            {patientPostStrings.patientDescription}
                        </ThemedText>
                        <ThemedText
                            type="default"
                            lightColor={Colors.light.softerText}
                            darkColor={Colors.dark.softerText}
                            numberOfLines={3}
                            ellipsizeMode='tail'>
                            {post.patient_description}
                        </ThemedText></View>) :

                    // Show full description and assessment
                    (<View style={styles.content}>
                        <ThemedText type="defaultSemiBold">
                            {patientPostStrings.patientDescription}
                        </ThemedText>
                        <ThemedText type="default" lightColor={Colors.light.softerText} darkColor={Colors.dark.softerText}>
                            {post.patient_description}
                        </ThemedText>
                        <View style={styles.divider} />
                        <ThemedText type="defaultSemiBold">
                            {patientPostStrings.assessment}
                        </ThemedText>
                        <ThemedText type="default" lightColor={Colors.light.softerText} darkColor={Colors.dark.softerText}>
                            {post.assessment}
                        </ThemedText>
                    </View>)
                }
                {/* Hugs and comments */}
                <View style={styles.actionContainer}>
                    <IconButton
                        title={`${post.num_hugs} ${post.num_hugs === 1 ? patientPostStrings.hug.toLocaleLowerCase() : patientPostStrings.hugPlural.toLocaleLowerCase()}`}
                        iconName={hugged ? "heart-outline" : "heart-plus-outline"}
                        buttonTextColor={hugged ? huggedColor : notHuggedColor}
                        onPress={pressHugHandler}
                    />
                    <IconButton
                        title={`${Object.keys(post.comments).length} ${Object.keys(post.comments).length === 1 ? patientPostStrings.comment.toLocaleLowerCase() : patientPostStrings.commentPlural.toLocaleLowerCase()}`}
                        iconName="comment-text-multiple-outline"
                        buttonTextColor={{ light: Colors.dark.softerText, dark: Colors.dark.softerText }}
                    />
                </View>
                {/* Display comments on detailed modal */}
                {!previewOnly && Object.keys(post.comments).length > 0 &&
                    <View style={styles.commentsContainer}>
                        <View style={styles.divider} />
                        {renderComments()}
                    </View>
                }
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 36,
        borderRadius: 8
    },
    container: {
        gap: 24,
        flex: 1
    },
    commentInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    divider: {
        height: 1,
        marginVertical: '2%',
        backgroundColor: '#00000020',
        width: '100%',
    },
    actionContainer: {
        flexDirection: 'row',
        gap: 18
    },
    commentsContainer: {
        maxHeight: '50%'
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255, 150, 7, 0.08)',
        padding: 18,
        borderRadius: 8
    },
    content: {
        width: '100%',
        backgroundColor: 'rgba(255, 150, 7, 0.08)',
        gap: 6,
        padding: 18,
        borderRadius: 8
    },
})

// COMMENTS
// < View style = { styles.commentsContainer } >
//     <ThemedText type="defaultSemiBold">
//         Patient Name
//     </ThemedText>
//     <ThemedText type="default" lightColor={Colors.light.softerText} darkColor={Colors.dark.softerText}>
//         I'm an AI and not a doctor. Please consult with a healthcare professional for a formal diagnosis and treatment.
//     </ThemedText>
// </View >