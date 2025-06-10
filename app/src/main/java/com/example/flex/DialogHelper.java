package com.example.flex;

import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.text.method.LinkMovementMethod;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

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

    public void showUpdateDialog(String version, int sizeMB, String releaseNotes, String downloadUrl, boolean isFirstLaunch) {
        cleanupOldApks();

        // Inflate the layout
        View dialogView = LayoutInflater.from(context).inflate(R.layout.dialog_update, null);

        // Initialize views
        TextView versionPill = dialogView.findViewById(R.id.version_pill);
        TextView sizeView = dialogView.findViewById(R.id.size_view);
        TextView notesView = dialogView.findViewById(R.id.notes_view);
        TextView titleView = dialogView.findViewById(R.id.title_view);
        LinearLayout progressLayout = dialogView.findViewById(R.id.progress_layout);
        ProgressBar progressBar = dialogView.findViewById(R.id.progress_bar);
        TextView progressText = dialogView.findViewById(R.id.progress_text);
        TextView progressLabel = dialogView.findViewById(R.id.progress_label);
        Button btnDownload = dialogView.findViewById(R.id.btn_download);
        Button btnLater = dialogView.findViewById(R.id.btn_later);

        // Set dynamic content
        versionPill.setText(String.format("v%s", version));
        sizeView.setText(String.format("%d MB", sizeMB));

        // Parse and display markdown notes
        int screenWidth = context.getResources().getDisplayMetrics().widthPixels;
        int desiredWidth = Math.min((int) (screenWidth * 0.975), 450);
        MarkdownHelper markdownHelper = new MarkdownHelper(context, dpToPx(desiredWidth));
        notesView.setText(markdownHelper.parseEnhancedMarkdown(releaseNotes));
        notesView.setMovementMethod(LinkMovementMethod.getInstance());

        // Create dialog without default buttons
        AlertDialog dialog = new AlertDialog.Builder(context, android.R.style.Theme_DeviceDefault_Dialog)
                .setView(dialogView)
                .setCancelable(true)
                .create();

        // Set window attributes
        Window window = dialog.getWindow();
        if (window != null) {
            WindowManager.LayoutParams lp = window.getAttributes();
            lp.width = desiredWidth;
            lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
            lp.gravity = Gravity.CENTER;
            window.setAttributes(lp);
            window.setBackgroundDrawableResource(R.drawable.dialog_rounded_background);

            // Add dimming effect
            window.addFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);
            window.setDimAmount(.9f); // 0 = fully transparent, 1 = fully opaque
        }

        // Set click listeners for custom buttons
        if (isFirstLaunch) {
            titleView.setText("Update Notes");

            btnDownload.setText("OK");
            btnLater.setVisibility(View.GONE);

            btnDownload.setOnClickListener(v -> {
                dialog.dismiss();
            });
        } else {
            btnDownload.setText("Update");
            btnLater.setVisibility(View.VISIBLE);

            btnDownload.setOnClickListener(v -> {
                if (!hasStoragePermission()) {
                    if (context instanceof MainActivity) {
                        ((MainActivity) context).requestStoragePermission();
                    }
                    Toast.makeText(context, "Please grant storage permission first",
                            Toast.LENGTH_SHORT).show();
                    return;
                }

                progressLayout.setVisibility(View.VISIBLE);
                btnDownload.setEnabled(false);
                btnLater.setEnabled(false);
                progressLabel.setText("Downloading update...");
                downloadWithDownloadManager(downloadUrl, version, dialog,
                        progressBar, progressText, progressLabel);
            });

            btnLater.setOnClickListener(v -> {
                cleanupOldApks();
                dialog.dismiss();
            });
        }

        dialog.setOnCancelListener(dialogInterface -> cleanupOldApks());
        dialog.show();
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

        Button btnDownload = dialog.findViewById(R.id.btn_download);
        if (btnDownload != null) {
            btnDownload.setText("Install");
            btnDownload.setEnabled(true);
            btnDownload.setOnClickListener(v -> {
                dialog.dismiss();
                installApk(fileName);
            });
        }
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
