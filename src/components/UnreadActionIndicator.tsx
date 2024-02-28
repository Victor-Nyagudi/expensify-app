import React from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import Icon from './Icon';
import * as Expensicons from './Icon/Expensicons';
import Text from './Text';

type UnreadActionIndicatorProps = {
    reportActionID: string;
    isThreadDividerLine?: boolean;
    isLastThread?: boolean;
};

function UnreadActionIndicator({reportActionID, isThreadDividerLine = false, isLastThread = false}: UnreadActionIndicatorProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    return (
        <View
            accessibilityLabel={translate('accessibilityHints.newMessageLineIndicator')}
            data-action-id={reportActionID}
            style={[isThreadDividerLine ? styles.threadDividerLineContainer : styles.unreadIndicatorContainer, styles.userSelectNone, !isThreadDividerLine && styles.pointerEventsNone]}
            dataSet={{[CONST.SELECTION_SCRAPER_HIDDEN_ELEMENT]: true}}
        >
            <View style={isThreadDividerLine ? styles.threadDividerLine : styles.unreadIndicatorLine} />

            {isThreadDividerLine ? (
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <Icon
                        src={Expensicons.CommentBubbleReply}
                        // Removed the 'fill' at the end of the <path>  of comment-bubble-reply.svg so this one can be applied,otherwise, it would just be the blue color from when I downloaded it from Figma.
                        // Also removed the 'fill=none' from the <svg> because it wasn't rendering on Android native.
                        fill={isLastThread ? styles.textSupporting.color : styles.link.color}
                        width={variables.iconSizeExtraSmall}
                        height={variables.iconSizeExtraSmall}
                        additionalStyles={styles.mr1}
                    />

                    <Text style={[styles.unreadIndicatorText, isLastThread ? styles.textSupporting : styles.link]}>{isLastThread ? 'Replies' : 'Thread'}</Text>
                </View>
            ) : (
                <Text style={styles.unreadIndicatorText}>{translate('common.new')}</Text>
            )}
        </View>
    );
}

UnreadActionIndicator.displayName = 'UnreadActionIndicator';

export default UnreadActionIndicator;
