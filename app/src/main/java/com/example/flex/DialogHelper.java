package com.example.flex;

import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.text.Layout;
import android.text.method.LinkMovementMethod;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import java.io.File;

public class DialogHelper {
    private static final String TAG = "DialogHelper";
    private static final String APK_PREFIX = "FlexApp_v";
    private static final String APK_EXTENSION = ".apk";

    private final Context context;

    public DialogHelper(Context context) {
        this.context = context;
    }

    // Convert dp to pixels
    private int dpToPx(int dp) {
        float density = context.getResources().getDisplayMetrics().density;
        return Math.round(dp * density);
    }

    /**
     * Cleans up any existing APK files for this app
     */

    public void cleanupOldApks() {
        try {
            // Clean app-specific downloads
            File appDownloadsDir = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
            deleteApkFilesInDirectory(appDownloadsDir);

            // Clean public downloads (as fallback)
            File publicDownloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            deleteApkFilesInDirectory(publicDownloadsDir);
        } catch (Exception e) {
            Log.e(TAG, "Error cleaning up old APKs", e);
        }
    }

    private void deleteApkFilesInDirectory(File directory) {
        if (directory != null && directory.exists()) {
            File[] files = directory.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.getName().startsWith(APK_PREFIX) && file.getName().endsWith(APK_EXTENSION)) {
                        boolean deleted = file.delete();
                        Log.d(TAG, "Deleted old APK: " + file.getName() + " - " + (deleted ? "Success" : "Failed"));
                    }
                }
            }
        }
    }

    /**
     * Checks if the downloaded APK matches the currently installed version
     */
    private boolean isDownloadedApkCurrentVersion(String version) {
        try {
            PackageInfo packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            String currentVersion = packageInfo.versionName;
            return currentVersion.equals(version);
        } catch (PackageManager.NameNotFoundException e) {
            Log.e(TAG, "Couldn't get package info", e);
            return false;
        }
    }

    public void showUpdateDialog(String ver, int sizeMB, String notes, String DURL) {
        cleanupOldApks();

        int screenWidth = context.getResources().getDisplayMetrics().widthPixels;
        int desiredWidthPx = dpToPx(400);
        int finalWidthPx = Math.min(desiredWidthPx,(int) (screenWidth * 0.9));

        // Main container layout
        LinearLayout mainLayout = new LinearLayout(context);
        mainLayout.setOrientation(LinearLayout.VERTICAL);
        mainLayout.setPadding(0, 0, 0, 0);
        mainLayout.setLayoutParams(new LinearLayout.LayoutParams(
                finalWidthPx,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ));

        // Header section
        LinearLayout headerLayout = new LinearLayout(context);
        headerLayout.setOrientation(LinearLayout.HORIZONTAL);
        headerLayout.setPadding(dpToPx(24), dpToPx(24), dpToPx(24), dpToPx(16));
        headerLayout.setGravity(Gravity.CENTER_VERTICAL);

        LinearLayout leftSection = new LinearLayout(context);
        leftSection.setOrientation(LinearLayout.HORIZONTAL);
        leftSection.setGravity(Gravity.CENTER_VERTICAL);
        leftSection.setLayoutParams(new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f));

        TextView iconView = new TextView(context);
        iconView.setText("ⓘ");
        iconView.setTextSize(32);
        iconView.setPadding(0, 0, dpToPx(16), 0);
        leftSection.addView(iconView);

        TextView titleView = new TextView(context);
        titleView.setText("Update Available");
        titleView.setTextSize(20);
        titleView.setTypeface(null, Typeface.BOLD);
        titleView.setTextColor(ContextCompat.getColor(context, android.R.color.white));
        leftSection.addView(titleView);

        headerLayout.addView(leftSection);

        LinearLayout rightSection = new LinearLayout(context);
        rightSection.setOrientation(LinearLayout.VERTICAL);
        rightSection.setGravity(Gravity.END | Gravity.CENTER_VERTICAL);

        TextView versionPill = new TextView(context);
        versionPill.setText("v" + ver);
        versionPill.setTextSize(12);
        versionPill.setTypeface(null, Typeface.BOLD);
        versionPill.setTextColor(ContextCompat.getColor(context, android.R.color.white));
        versionPill.setPadding(dpToPx(12), dpToPx(6), dpToPx(12), dpToPx(6));
        versionPill.setBackground(ContextCompat.getDrawable(context, R.drawable.version_pill_background));
        rightSection.addView(versionPill);

        TextView sizeView = new TextView(context);
        sizeView.setText(sizeMB + " MB");
        sizeView.setTextSize(12);
        sizeView.setTextColor(ContextCompat.getColor(context, android.R.color.darker_gray));
        sizeView.setGravity(Gravity.END);
        sizeView.setPadding(0, dpToPx(4), dpToPx(8), 0);
        rightSection.addView(sizeView);

        headerLayout.addView(rightSection);
        mainLayout.addView(headerLayout);

        View divider1 = new View(context);
        divider1.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, dpToPx(1)
        ));
        divider1.setBackgroundColor(ContextCompat.getColor(context, android.R.color.darker_gray));
        mainLayout.addView(divider1);

        // Scrollable content section
        ScrollView scrollView = new ScrollView(context);
        scrollView.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, dpToPx(250)
        ));
        scrollView.setSmoothScrollingEnabled(true);
        scrollView.setFadingEdgeLength(dpToPx(16));
        scrollView.setVerticalFadingEdgeEnabled(true);
        scrollView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        scrollView.setOverScrollMode(View.OVER_SCROLL_IF_CONTENT_SCROLLS);

        LinearLayout contentLayout = new LinearLayout(context);
        contentLayout.setOrientation(LinearLayout.VERTICAL);
        contentLayout.setPadding(dpToPx(24), dpToPx(16), dpToPx(24), dpToPx(16));

        TextView releaseNotesLabel = new TextView(context);
        releaseNotesLabel.setText("What's New");
        releaseNotesLabel.setTextSize(16);
        releaseNotesLabel.setTypeface(null, Typeface.BOLD);
        releaseNotesLabel.setTextColor(ContextCompat.getColor(context, android.R.color.white));
        releaseNotesLabel.setPadding(0, 0, 0, dpToPx(12));
        contentLayout.addView(releaseNotesLabel);

        MarkdownHelper markdownHelper = new MarkdownHelper(context, finalWidthPx);
        TextView notesView = new TextView(context);
        notesView.setText(markdownHelper.parseEnhancedMarkdown(notes));
        notesView.setTextSize(14);
        notesView.setTextColor(ContextCompat.getColor(context, android.R.color.secondary_text_dark));
        notesView.setLineSpacing(dpToPx(4), 1.2f);
        notesView.setMovementMethod(LinkMovementMethod.getInstance());
        notesView.setTextIsSelectable(false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            notesView.setHyphenationFrequency(Layout.HYPHENATION_FREQUENCY_NORMAL);
        }
        contentLayout.addView(notesView);

        scrollView.addView(contentLayout);
        mainLayout.addView(scrollView);

        // Progress section (initially hidden)
        LinearLayout progressLayout = new LinearLayout(context);
        progressLayout.setOrientation(LinearLayout.VERTICAL);
        progressLayout.setPadding(dpToPx(24), dpToPx(8), dpToPx(24), dpToPx(16));
        progressLayout.setVisibility(View.GONE);

        TextView progressLabel = new TextView(context);
        progressLabel.setText("Downloading...");
        progressLabel.setTextSize(14);
        progressLabel.setTextColor(ContextCompat.getColor(context, android.R.color.white));
        progressLabel.setPadding(0, 0, 0, dpToPx(8));
        progressLayout.addView(progressLabel);

        ProgressBar progressBar = new ProgressBar(context, null, android.R.attr.progressBarStyleHorizontal);
        progressBar.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, dpToPx(8)
        ));
        progressBar.setProgressDrawable(ContextCompat.getDrawable(context, R.drawable.custom_progress_bar));
        progressLayout.addView(progressBar);

        TextView progressText = new TextView(context);
        progressText.setText("0%");
        progressText.setTextSize(12);
        progressText.setTextColor(ContextCompat.getColor(context, android.R.color.darker_gray));
        progressText.setPadding(0, dpToPx(4), 0, 0);
        progressText.setGravity(Gravity.CENTER);
        progressLayout.addView(progressText);

        mainLayout.addView(progressLayout);

        View divider2 = new View(context);
        divider2.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, dpToPx(1)
        ));
        divider2.setBackgroundColor(ContextCompat.getColor(context, android.R.color.darker_gray));
        mainLayout.addView(divider2);

        // Wrap mainLayout inside a fixed-width container
        FrameLayout container = new FrameLayout(context);
        FrameLayout.LayoutParams containerParams = new FrameLayout.LayoutParams(
                finalWidthPx, FrameLayout.LayoutParams.WRAP_CONTENT
        );
        container.setLayoutParams(containerParams);
        container.addView(mainLayout);

        AlertDialog.Builder builder = new AlertDialog.Builder(
                context, android.R.style.Theme_DeviceDefault_Dialog
        );
        builder.setView(container)
                .setPositiveButton("Download", null)
                .setNegativeButton("Later", null);

        AlertDialog dialog = builder.create();

        Window window = dialog.getWindow();
        if (window != null) {
            window.setBackgroundDrawableResource(R.drawable.dialog_rounded_background);
            WindowManager.LayoutParams lp = window.getAttributes();
            lp.width = finalWidthPx;
            lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
            lp.gravity = Gravity.CENTER;
            window.setAttributes(lp);
        }

        dialog.setOnCancelListener(dialogInterface -> cleanupOldApks());
        dialog.show();

        Button posBtn = dialog.getButton(AlertDialog.BUTTON_POSITIVE);
        Button negBtn = dialog.getButton(AlertDialog.BUTTON_NEGATIVE);

        if (posBtn != null && negBtn != null) {
            posBtn.setOnClickListener(v -> {
                if (!hasStoragePermission()) {
                    if (context instanceof MainActivity) {
                        ((MainActivity) context).requestStoragePermission();
                    }
                    Toast.makeText(context, "Please grant storage permission first", Toast.LENGTH_SHORT).show();
                    return;
                }

                progressLayout.setVisibility(View.VISIBLE);
                posBtn.setEnabled(false);
                negBtn.setEnabled(false);
                progressLabel.setText("Downloading update...");
                downloadWithDownloadManager(DURL, ver, dialog, progressBar, progressText, progressLabel);
            });

            negBtn.setTextColor(ContextCompat.getColor(context, android.R.color.darker_gray));
            negBtn.setOnClickListener(v -> {
                cleanupOldApks();
                dialog.dismiss();
            });
        }
    }

    private boolean hasStoragePermission() {
        if (context instanceof MainActivity) {
            return ((MainActivity) context).hasStoragePermission();
        }
        return false;
    }

    private void downloadWithDownloadManager(String downloadUrl, String version, AlertDialog dialog,
                                             ProgressBar progressBar, TextView progressText,
                                             TextView progressLabel) {
        // Clean up any old APKs before starting new download
        cleanupOldApks();

        try {
            DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            Uri uri = Uri.parse(downloadUrl);
            DownloadManager.Request request = new DownloadManager.Request(uri);

            // Save to app-specific directory for better security
            String fileName = APK_PREFIX + version + APK_EXTENSION;
            File downloadsDir = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
            File destinationFile = new File(downloadsDir, fileName);

            // Remove previous file if exists
            if (destinationFile.exists()) {
                boolean deleted = destinationFile.delete();
                Log.d(TAG, "Deleted existing APK before download: " + deleted);
            }

            request.setDestinationUri(Uri.fromFile(destinationFile));
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            request.setTitle("Flex App Update");
            request.setDescription("Downloading version " + version);
            request.setMimeType("application/vnd.android.package-archive");
            request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI | DownloadManager.Request.NETWORK_MOBILE);

            long downloadId = downloadManager.enqueue(request);
            monitorDownloadWithUI(downloadId, downloadManager, dialog, progressBar,
                    progressText, progressLabel, fileName);
        } catch (Exception e) {
            // Clean up if download fails
            cleanupOldApks();
            Log.e(TAG, "Download failed", e);
            Toast.makeText(context, "Download failed: " + e.getMessage(), Toast.LENGTH_LONG).show();
            dialog.dismiss();
        }
    }

    private void monitorDownloadWithUI(long downloadId, DownloadManager downloadManager,
                                       AlertDialog dialog, ProgressBar progressBar, TextView progressText,
                                       TextView progressLabel, String fileName) {
        new Thread(() -> {
            boolean downloading = true;
            while (downloading) {
                DownloadManager.Query query = new DownloadManager.Query();
                query.setFilterById(downloadId);

                try (android.database.Cursor cursor = downloadManager.query(query)) {
                    if (cursor != null && cursor.moveToFirst()) {
                        // Get column indices safely
                        int statusIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
                        int bytesDownloadedIndex = cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR);
                        int totalSizeIndex = cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES);
                        int reasonIndex = cursor.getColumnIndex(DownloadManager.COLUMN_REASON);

                        // Only proceed if we have valid column indices
                        if (statusIndex >= 0) {
                            int status = cursor.getInt(statusIndex);
                            long downloaded = bytesDownloadedIndex >= 0 ? cursor.getLong(bytesDownloadedIndex) : 0;
                            long total = totalSizeIndex >= 0 ? cursor.getLong(totalSizeIndex) : 0;

                            switch (status) {
                                case DownloadManager.STATUS_RUNNING:
                                    if (total > 0) {
                                        int progress = (int) ((downloaded * 100L) / total);
                                        ((MainActivity)context).runOnUiThread(() ->
                                                updateProgressUI(progressBar, progressText, progressLabel, progress, downloaded, total));
                                    }
                                    break;

                                case DownloadManager.STATUS_SUCCESSFUL:
                                    downloading = false;
                                    ((MainActivity)context).runOnUiThread(() ->
                                            handleDownloadSuccess(dialog, progressBar, progressText, progressLabel, fileName));
                                    break;

                                case DownloadManager.STATUS_FAILED:
                                    downloading = false;
                                    int reason = reasonIndex >= 0 ? cursor.getInt(reasonIndex) : DownloadManager.ERROR_UNKNOWN;
                                    ((MainActivity)context).runOnUiThread(() -> {
                                        handleDownloadFailure(dialog, progressText, progressLabel, reason);
                                        cleanupOldApks();
                                    });
                                    break;
                            }
                        } else {
                            Log.e(TAG, "Required columns not found in download cursor");
                            downloading = false;
                            ((MainActivity)context).runOnUiThread(() -> {
                                progressLabel.setText("Download error");
                                progressText.setText("Internal error");
                                cleanupOldApks();
                            });
                        }
                    } else {
                        Log.e(TAG, "Download cursor is null or empty");
                        downloading = false;
                        ((MainActivity)context).runOnUiThread(() -> {
                            progressLabel.setText("Download error");
                            progressText.setText("No download information");
                            cleanupOldApks();
                        });
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error monitoring download", e);
                    downloading = false;
                    ((MainActivity)context).runOnUiThread(() -> {
                        progressLabel.setText("Download error");
                        progressText.setText(e.getMessage());
                        cleanupOldApks();
                    });
                }

                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }).start();
    }

    private void updateProgressUI(ProgressBar progressBar, TextView progressText,
                                  TextView progressLabel, int progress,
                                  long downloaded, long total) {
        String downloadedMB = String.format("%.1f", downloaded / (1024.0 * 1024.0));
        String totalMB = String.format("%.1f", total / (1024.0 * 1024.0));

        progressBar.setProgress(progress);
        progressText.setText(String.format("%d%% (%s/%s MB)", progress, downloadedMB, totalMB));
        progressLabel.setText("Downloading...");
    }

    private void handleDownloadSuccess(AlertDialog dialog, ProgressBar progressBar,
                                       TextView progressText, TextView progressLabel,
                                       String fileName) {
        progressBar.setProgress(100);
        progressText.setText("100% - Ready to install");
        progressLabel.setText("Download complete");

        Button installBtn = dialog.getButton(AlertDialog.BUTTON_POSITIVE);
        installBtn.setText("Install Now");
        installBtn.setEnabled(true);
        installBtn.setOnClickListener(v -> {
            dialog.dismiss();
            installApk(fileName);
        });
    }

    private void handleDownloadFailure(AlertDialog dialog, TextView progressText,
                                       TextView progressLabel, int reason) {
        progressLabel.setText("Download failed");
        progressText.setText("Error: " + getDownloadErrorString(reason));
        dialog.getButton(AlertDialog.BUTTON_POSITIVE).setEnabled(true);
    }

    private String getDownloadErrorString(int reason) {
        switch (reason) {
            case DownloadManager.ERROR_CANNOT_RESUME:
                return "Cannot resume download";
            case DownloadManager.ERROR_DEVICE_NOT_FOUND:
                return "Storage not available";
            case DownloadManager.ERROR_FILE_ALREADY_EXISTS:
                return "File already exists";
            case DownloadManager.ERROR_FILE_ERROR:
                return "File system error";
            case DownloadManager.ERROR_HTTP_DATA_ERROR:
                return "HTTP error";
            case DownloadManager.ERROR_INSUFFICIENT_SPACE:
                return "Insufficient storage";
            case DownloadManager.ERROR_TOO_MANY_REDIRECTS:
                return "Too many redirects";
            case DownloadManager.ERROR_UNHANDLED_HTTP_CODE:
                return "Unhandled HTTP code";
            case DownloadManager.ERROR_UNKNOWN: // or your ERROR_UNKNOWN constant
                return "Unknown error";
            default:
                return "Unknown error (" + reason + ")";
        }
    }

    private void installApk(String fileName) {
        try {
            File apkFile = findApkFile(fileName);

            if (apkFile == null || !apkFile.exists()) {
                Toast.makeText(context, "APK file not found", Toast.LENGTH_LONG).show();
                cleanupOldApks();
                return;
            }

            Uri apkUri;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                apkUri = FileProvider.getUriForFile(
                        context,
                        context.getPackageName() + ".provider",
                        apkFile
                );
            } else {
                apkUri = Uri.fromFile(apkFile);
            }

            // Register receiver to clean up after installation
            context.registerReceiver(new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    if (intent.getData() != null &&
                            intent.getData().getSchemeSpecificPart().equals(context.getPackageName())) {
                        // Our app was installed - delete the APK
                        if (apkFile.exists()) {
                            boolean deleted = apkFile.delete();
                            Log.d(TAG, "APK deleted after installation: " + deleted);
                        }
                        context.unregisterReceiver(this);
                    }
                }
            }, new IntentFilter(Intent.ACTION_PACKAGE_ADDED));

            Intent install = new Intent(Intent.ACTION_VIEW);
            install.setDataAndType(apkUri, "application/vnd.android.package-archive");
            install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            if (install.resolveActivity(context.getPackageManager()) != null) {
                context.startActivity(install);
            } else {
                Toast.makeText(context, "No app available to install APKs", Toast.LENGTH_LONG).show();
                cleanupOldApks();
            }
        } catch (Exception e) {
            Log.e(TAG, "Installation failed", e);
            Toast.makeText(context, "Installation failed: " + e.getMessage(), Toast.LENGTH_LONG).show();
            cleanupOldApks();
        }
    }

    private File findApkFile(String fileName) {
        // Check app-specific downloads first
        File appDownloads = new File(context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), fileName);
        if (appDownloads.exists()) {
            return appDownloads;
        }

        // Check public Downloads as fallback
        File publicDownloads = new File(
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
                fileName
        );
        if (publicDownloads.exists()) {
            return publicDownloads;
        }

        return null;
    }
}