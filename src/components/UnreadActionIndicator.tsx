import React from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import Icon from './Icon';
import * as Expensicons from './Icon/Expensicons';
import {PressableWithoutFeedback} from './Pressable';
import Text from './Text';

type UnreadActionIndicatorProps = {
    reportActionID: string;
    isThreadDividerLine?: boolean;
    isLastThread?: boolean;
};

function UnreadActionIndicator({reportActionID, isThreadDividerLine = false, isLastThread = false}: UnreadActionIndicatorProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const threadDivider = isLastThread ? (
        <>
            <View style={[styles.flexRow, styles.alignItemsCenter]}>
                <Icon
                    src={Expensicons.CommentBubbleReply}
                    // Removed the fill at the end of comment-bubble-reply.svg so this one can be applied,
                    // otherwise it would just be the blue color from when I downloaded it from Figma.
                    fill={styles.textSupporting.color}
                    width={variables.iconSizeExtraSmall}
                    height={variables.iconSizeExtraSmall}
                    additionalStyles={styles.mr1}
                />

                <Text style={[styles.unreadIndicatorText, styles.textSupporting]}>{'Replies'}</Text>
            </View>
        </>
    ) : (
        <PressableWithoutFeedback
            onPress={() => {
                console.log('You clicked the thread divider.');
                Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(reportActionID));
            }}
            // This will be translated like in ParentNavigationSubtitle
            accessibilityLabel={'Ancestor parent report'}
            role={CONST.ROLE.LINK}
            // Giving this a height of 20 oddly matched the vertical margin in the design.
            style={[styles.flexRow, styles.alignItemsCenter, {height: 20}]}
        >
            <Icon
                src={Expensicons.CommentBubbleReply}
                fill={styles.link.color}
                width={variables.iconSizeExtraSmall}
                height={variables.iconSizeExtraSmall}
                additionalStyles={styles.mr1}
            />

            <Text style={[styles.unreadIndicatorText, styles.link]}>{'Thread'}</Text>
        </PressableWithoutFeedback>
    );

    return (
        <View
            accessibilityLabel={translate('accessibilityHints.newMessageLineIndicator')}
            data-action-id={reportActionID}
            style={[isThreadDividerLine ? styles.threadDividerLineContainer : styles.unreadIndicatorContainer, styles.userSelectNone, !isThreadDividerLine && styles.pointerEventsNone]}
            dataSet={{[CONST.SELECTION_SCRAPER_HIDDEN_ELEMENT]: true}}
        >
            <View style={isThreadDividerLine ? styles.threadDividerLine : styles.unreadIndicatorLine} />

            {isThreadDividerLine ? threadDivider : <Text style={styles.unreadIndicatorText}>{translate('common.new')}</Text>}
        </View>
    );
}

UnreadActionIndicator.displayName = 'UnreadActionIndicator';

export default UnreadActionIndicator;
