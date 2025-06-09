package com.example.flex;

import android.content.Context;
import android.os.Build;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.style.LeadingMarginSpan;

import androidx.core.content.ContextCompat;

public class MarkdownHelper {
    private Context context;
    private int screenWidthPx;

    public MarkdownHelper(Context context, int screenWidthPx) {
        this.context = context;
        this.screenWidthPx = screenWidthPx;
    }

    public android.text.Spannable parseEnhancedMarkdown(String markdown) {
        android.text.SpannableStringBuilder spannable = new android.text.SpannableStringBuilder();

        if (markdown == null || markdown.trim().isEmpty()) {
            spannable.append("No release notes available.");
            return spannable;
        }

        // Split by lines but keep empty lines
        String[] lines = markdown.split("\n", -1);
        boolean inList = false;
        boolean inCodeBlock = false;
        boolean lastLineEmpty = false;

        for (String line : lines) {
            String trimmedLine = line.trim();
            boolean currentLineEmpty = trimmedLine.isEmpty();

            // Handle code blocks
            if (trimmedLine.startsWith("```")) {
                inCodeBlock = !inCodeBlock;
                continue;
            }

            if (inCodeBlock) {
                // Add code block line with monospace
                int start = spannable.length();
                spannable.append(line).append("\n");
                spannable.setSpan(new android.text.style.TypefaceSpan("monospace"),
                        start, spannable.length(), android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
                continue;
            }

            // Skip multiple empty lines
            if (currentLineEmpty && lastLineEmpty) {
                continue;
            }

            if (currentLineEmpty) {
                spannable.append("\n");
                inList = false;
                lastLineEmpty = true;
                continue;
            }

            lastLineEmpty = false;

            // Headers
            if (trimmedLine.startsWith("### ")) {
                addHeader(spannable, trimmedLine.substring(4).trim(), 1.1f);
            }
            else if (trimmedLine.startsWith("## ")) {
                addHeader(spannable, trimmedLine.substring(3).trim(), 1.2f);
            }
            else if (trimmedLine.startsWith("# ")) {
                addHeader(spannable, trimmedLine.substring(2).trim(), 1.3f);
            }
            // Lists
            else if (trimmedLine.matches("^[\\-\\*\\+] .*")) {
                if (!inList) {
                    inList = true;
                    if (spannable.length() > 0 && spannable.charAt(spannable.length() - 1) != '\n') {
                        spannable.append("\n");
                    }
                }
                addListItem(spannable, trimmedLine.substring(2).trim());
            }
            else if (trimmedLine.matches("^\\d+\\.\\s.*")) {
                if (!inList) {
                    inList = true;
                    if (spannable.length() > 0 && spannable.charAt(spannable.length() - 1) != '\n') {
                        spannable.append("\n");
                    }
                }
                String[] parts = trimmedLine.split("\\.", 2);
                if (parts.length >= 2) {
                    addNumberedItem(spannable, parts[0], parts[1].trim());
                }
            }
            // Regular text
            else {
                if (inList) {
                    inList = false;
                    spannable.append("\n");
                }
                processInlineFormatting(spannable, line);
                spannable.append("\n");
            }
        }

        return spannable;
    }

    private void addHeader(android.text.SpannableStringBuilder spannable, String text, float size) {
        int start = spannable.length();
        spannable.append(text);
        spannable.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD),
                start, spannable.length(), android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        spannable.setSpan(new android.text.style.RelativeSizeSpan(size),
                start, spannable.length(), android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        spannable.append("\n\n");
    }

    private void addListItem(android.text.SpannableStringBuilder spannable, String text) {
        int listItemStart = spannable.length();
        spannable.append("• ");

        // Process the text with formatting
        processInlineFormatting(spannable, text);
        int listItemEnd = spannable.length();

        // Calculate bullet width
        TextPaint paint = new TextPaint();
        paint.setTextSize(16 * context.getResources().getDisplayMetrics().scaledDensity); // Default text size
        float bulletWidth = paint.measureText("• ");

        // Apply margin to the entire item (bullet + text)
        spannable.setSpan(new LeadingMarginSpan.Standard((int)bulletWidth, 0),
                listItemStart, listItemEnd, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

        spannable.append("\n");
    }

    private void addNumberedItem(android.text.SpannableStringBuilder spannable, String number, String text) {
        int itemStart = spannable.length();
        spannable.append(number).append(". ");

        // Process the text with formatting
        processInlineFormatting(spannable, text);
        int itemEnd = spannable.length();

        // Calculate number width
        TextPaint paint = new TextPaint();
        paint.setTextSize(16 * context.getResources().getDisplayMetrics().scaledDensity); // Default text size
        float numberWidth = paint.measureText(number + ". ");

        // Apply margin to the entire item (number + text)
        spannable.setSpan(new LeadingMarginSpan.Standard((int)numberWidth, 0),
                itemStart, itemEnd, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

        spannable.append("\n");
    }

    private void processInlineFormatting(android.text.SpannableStringBuilder spannable, String text) {
        String remaining = text;

        while (!remaining.isEmpty()) {
            // Find the next formatting marker
            int boldStart = remaining.indexOf("**");
            int italicStart = remaining.indexOf("*");
            int codeStart = remaining.indexOf("`");

            // Determine which comes first
            int nextFormatStart = -1;
            String formatType = "";

            if (boldStart != -1 && (nextFormatStart == -1 || boldStart < nextFormatStart)) {
                nextFormatStart = boldStart;
                formatType = "bold";
            }
            if (italicStart != -1 && italicStart != boldStart && (nextFormatStart == -1 || italicStart < nextFormatStart)) {
                nextFormatStart = italicStart;
                formatType = "italic";
            }
            if (codeStart != -1 && (nextFormatStart == -1 || codeStart < nextFormatStart)) {
                nextFormatStart = codeStart;
                formatType = "code";
            }

            if (nextFormatStart == -1) {
                // No more formatting, append the rest
                spannable.append(remaining);
                break;
            }

            // Append text before the formatting
            spannable.append(remaining.substring(0, nextFormatStart));

            // Process the formatting
            if (formatType.equals("bold")) {
                int boldEnd = remaining.indexOf("**", boldStart + 2);
                if (boldEnd != -1) {
                    String boldText = remaining.substring(boldStart + 2, boldEnd);
                    addStyledText(spannable, boldText, 1.0f, android.graphics.Typeface.BOLD, false);
                    remaining = remaining.substring(boldEnd + 2);
                } else {
                    spannable.append("**");
                    remaining = remaining.substring(boldStart + 2);
                }
            }
            else if (formatType.equals("italic")) {
                int italicEnd = remaining.indexOf("*", italicStart + 1);
                if (italicEnd != -1) {
                    String italicText = remaining.substring(italicStart + 1, italicEnd);
                    addStyledText(spannable, italicText, 1.0f, android.graphics.Typeface.ITALIC, false);
                    remaining = remaining.substring(italicEnd + 1);
                } else {
                    spannable.append("*");
                    remaining = remaining.substring(italicStart + 1);
                }
            }
            else if (formatType.equals("code")) {
                int codeEnd = remaining.indexOf("`", codeStart + 1);
                if (codeEnd != -1) {
                    String codeText = remaining.substring(codeStart + 1, codeEnd);
                    addCodeText(spannable, codeText);
                    remaining = remaining.substring(codeEnd + 1);
                } else {
                    spannable.append("`");
                    remaining = remaining.substring(codeStart + 1);
                }
            }
        }
    }

    private void addStyledText(android.text.SpannableStringBuilder spannable, String text,
                               float sizeMultiplier, int typeface, boolean addSpacing) {
        int start = spannable.length();
        spannable.append(text);
        int end = spannable.length();

        if (typeface != 0) {
            spannable.setSpan(new android.text.style.StyleSpan(typeface),
                    start, end, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        }

        if (sizeMultiplier != 1.0f) {
            spannable.setSpan(new android.text.style.RelativeSizeSpan(sizeMultiplier),
                    start, end, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        }

        if (addSpacing) {
            spannable.append("\n");
        }
    }

    private void addCodeText(android.text.SpannableStringBuilder spannable, String text) {
        int start = spannable.length();
        spannable.append(text);
        int end = spannable.length();

        // Monospace font for code
        spannable.setSpan(new android.text.style.TypefaceSpan("monospace"),
                start, end, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

        // Different background color for code (if available)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            spannable.setSpan(new android.text.style.BackgroundColorSpan(
                            ContextCompat.getColor(context, android.R.color.darker_gray)),
                    start, end, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
    }
}