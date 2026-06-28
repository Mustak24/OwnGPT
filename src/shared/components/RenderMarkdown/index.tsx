
import { useMemo } from "react";
import Markdown from "react-native-markdown-display";
import { useThemeStore } from "@funtools/native-ui/theme";

export type RenderMarkdownProps = {
    markdown: string;
};

export function RenderMarkdown({ markdown }: RenderMarkdownProps) {
    const colors = useThemeStore(store => store.colors);

    const markdownStyles = useMemo(
        () => ({
            body: {
                color: colors.text,
                backgroundColor: colors["bg"],
            },
            text: {
                color: colors.text,
                fontSize: 16,
                lineHeight: 24,
            },
            paragraph: {
                marginTop: 8,
                marginBottom: 12,
            },
            heading1: {
                color: colors.text,
                fontSize: 30,
                fontWeight: '800' as const,
                marginTop: 16,
                marginBottom: 12,
            },
            heading2: {
                color: colors.text,
                fontSize: 24,
                fontWeight: '700' as const,
                marginTop: 14,
                marginBottom: 10,
            },
            heading3: {
                color: colors.text,
                fontSize: 20,
                fontWeight: '700' as const,
                marginTop: 12,
                marginBottom: 10,
            },
            heading4: {
                color: colors.text,
                fontSize: 18,
                fontWeight: '700' as const,
                marginTop: 10,
                marginBottom: 8,
            },
            heading5: {
                color: colors.text,
                fontSize: 16,
                fontWeight: '700' as const,
                marginTop: 8,
                marginBottom: 6,
            },
            heading6: {
                color: colors.text,
                fontSize: 14,
                fontWeight: '700' as const,
                marginTop: 8,
                marginBottom: 6,
            },
            strong: {
                color: colors.text,
                fontWeight: '700' as const,
            },
            em: {
                color: colors.text,
                fontStyle: 'italic' as const,
            },
            s: {
                color: colors["text-secondary"],
                textDecorationLine: 'line-through' as const,
            },
            blockquote: {
                backgroundColor: colors["bg-secondary"],
                borderLeftColor: colors.primary,
                borderLeftWidth: 4,
                paddingHorizontal: 14,
                paddingVertical: 10,
                marginVertical: 12,
                borderRadius: 12,
            },
            bullet_list_icon: {
                color: colors.text,
            },
            ordered_list_icon: {
                color: colors.text,
            },
            list_item: {
                paddingVertical: 2,
            },
            code_inline: {
                backgroundColor: colors["bg-secondary"],
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 8,
                color: colors.primary,
            },
            fence: {
                backgroundColor: colors["bg-secondary"],
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 14,
                padding: 12,
                marginVertical: 12,
            },
            code_block: {
                backgroundColor: colors["bg-secondary"],
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 14,
                padding: 12,
                marginVertical: 12,
            },
            hr: {
                backgroundColor: colors.border,
                height: 1,
                marginVertical: 18,
            },
            table: {
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 12,
                overflow: 'hidden' as const,
                marginVertical: 12,
            },
            th: {
                backgroundColor: colors["bg-secondary"],
                color: colors.text,
                padding: 10,
            },
            td: {
                borderColor: colors.border,
                borderWidth: 1,
                padding: 10,
                color: colors.text,
            },
            tr: {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
            },
            link: {
                color: colors.primary,
                textDecorationLine: 'underline' as const,
            },
            blocklink: {
                color: colors.primary,
                textDecorationLine: 'underline' as const,
            },
            image: {
                flex: 1,
                marginVertical: 12,
            },
            hardbreak: {
                height: 1,
                backgroundColor: colors.border,
                marginVertical: 8,
            },
            softbreak: {
                height: 8,
            },
        }),
        [colors],
    );

    return (
        <Markdown style={markdownStyles}>
            {markdown}
        </Markdown>
    );
}