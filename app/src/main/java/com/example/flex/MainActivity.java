package com.example.flex;

import static android.webkit.WebViewClient.ERROR_CONNECT;
import static android.webkit.WebViewClient.ERROR_HOST_LOOKUP;

import android.Manifest;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Environment;
import android.os.Looper;

import androidx.annotation.NonNull;

import org.json.JSONObject;

import java.net.HttpURLConnection;
import java.net.URL;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.google.android.material.progressindicator.LinearProgressIndicator;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Objects;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private boolean firstPage = true;
    private SwipeRefreshLayout swipeRefreshLayout;
    private boolean redirectInProgress = false;
    private LinearLayout errorView;
    private TextView errorMessage;
    private TextView errorCode;
    private Button retryButton;
    private LinearProgressIndicator progressIndicator;
    private View loaderView;
    private static final String TAG = "FlexApp";
    private final Handler timeoutHandler = new Handler();
    private Runnable timeoutRunnable;
    private boolean isRetrying = false;

    private static final int STORAGE_PERMISSION_CODE = 100;
    private static final int MANAGE_STORAGE_CODE = 2296;

    // URLs
    public static final String BASE_URL = "https://flexstudent.nu.edu.pk/";
    private static final String LOGIN_URL = BASE_URL + "Login";
    private static final String MARKS_URL = BASE_URL + "Student/StudentMarks?semid=20251";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        initializeViews();
        setupWebView();
        setupSwipeRefresh();
        setupRetryButton();

        // Request storage permission when the app starts
        if (!hasStoragePermission()) {
            requestStoragePermission();
        } else {
            loadInitialPage();
        }
        checkForUpdate();
    }

    private void initializeViews() {
        webView = findViewById(R.id.webview);
        errorView = findViewById(R.id.error_view);
        errorMessage = findViewById(R.id.error_message);
        errorCode = findViewById(R.id.error_code);
        retryButton = findViewById(R.id.retry_button);
        progressIndicator = findViewById(R.id.progress_indicator);
        loaderView = findViewById(R.id.loader_view);
        swipeRefreshLayout = findViewById(R.id.swipe_refresh);
    }

    private void setupSwipeRefresh() {
        swipeRefreshLayout.setProgressViewOffset(false, 0, 170);
        swipeRefreshLayout.setOnChildScrollUpCallback((parent, child) -> webView.getScrollY() > 0);
        swipeRefreshLayout.setColorSchemeColors(
                ContextCompat.getColor(this, R.color.progress_color_1),
                ContextCompat.getColor(this, R.color.progress_color_2),
                ContextCompat.getColor(this, R.color.progress_color_3)
        );
        swipeRefreshLayout.setOnRefreshListener(() -> {
            if (!isNetworkAvailable()) {
                swipeRefreshLayout.setRefreshing(false);
                handleError(ERROR_CONNECT, "No internet connection", webView.getUrl());
                return;
            }
            webView.reload();
        });
    }

    private void resetWebViewState() {
        webView.stopLoading();
        webView.loadUrl("about:blank");
        firstPage = true;
        redirectInProgress = false;
    }

    private void loadInitialPage() {
        if (isNetworkAvailable()) {
            showLoaderWithAnimation();
            webView.setVisibility(View.GONE);
            progressIndicator.setVisibility(View.VISIBLE);
            progressIndicator.setIndeterminate(true);

            timeoutHandler.removeCallbacks(timeoutRunnable);
            timeoutRunnable = () -> {
                if (webView.getProgress() < 100) {
                    handleError(-1, "Connection timed out", LOGIN_URL);
                }
            };
            timeoutHandler.postDelayed(timeoutRunnable, 15000);

            safeLoadUrl(LOGIN_URL);
        } else {
            showErrorView("No internet connection. Please check your network settings and try again.");
        }
    }

    private void safeLoadUrl(String url) {
        String currentUrl = webView.getUrl();
        if (currentUrl != null && currentUrl.equals(url)) {
            return;
        }
        webView.loadUrl(url);
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView() {
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            webSettings.setForceDark(WebSettings.FORCE_DARK_ON);
        }
        webSettings.setAllowContentAccess(true);

        webView.setBackgroundColor(ContextCompat.getColor(this, R.color.dark_gray));
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            webSettings.setSafeBrowsingEnabled(false);
        }

        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setVisibility(View.GONE);
        webView.setWebChromeClient(new CustomWebChromeClient());
        webView.setWebViewClient(new EnhancedWebViewClient());
    }

    private class CustomWebChromeClient extends WebChromeClient {
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            if (progressIndicator != null) {
                progressIndicator.setVisibility(View.VISIBLE);
                progressIndicator.setIndeterminate(false);
                progressIndicator.setProgress(newProgress);

                if (newProgress >= 100) {
                    timeoutHandler.removeCallbacks(timeoutRunnable);
                    progressIndicator.animate()
                            .alpha(0f)
                            .setDuration(500)
                            .setListener(new AnimatorListenerAdapter() {
                                @Override
                                public void onAnimationEnd(Animator animation) {
                                    progressIndicator.setVisibility(View.INVISIBLE);
                                    progressIndicator.setAlpha(1f);
                                }
                            })
                            .start();
                    swipeRefreshLayout.setRefreshing(false);
                }
            }
            super.onProgressChanged(view, newProgress);
        }
    }

    private class EnhancedWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            String url = request.getUrl().toString();
            if (shouldOpenInternally(url)) {
                return false;
            } else {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                return true;
            }
        }

        private boolean shouldOpenInternally(String url) {
            Uri uri = Uri.parse(url);
            String host = uri.getHost();
            return host != null && (host.contains("flexstudent.nu.edu.pk") ||
                    host.contains("farhanzafarr9.netlify.app"));
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);

            showLoaderWithAnimation();

            view.setAlpha(0f);
            view.setVisibility(View.GONE);

            if (!redirectInProgress) {
                swipeRefreshLayout.setRefreshing(true);
                progressIndicator.setVisibility(View.VISIBLE);
                progressIndicator.setIndeterminate(true);
                progressIndicator.setProgress(0);
            }
            hideErrorViewWithAnimation();
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            if (view.getContentHeight() == 0) {
                handleError(-1, "Page failed to load", url);
                return;
            }

            if (url.equals(LOGIN_URL) && firstPage) {
                firstPage = false;
                if (isNetworkAvailable()) {
                    redirectInProgress = true;
                    safeLoadUrl(MARKS_URL);
                } else {
                    handleError(-1, "Lost connection during redirect", url);
                }
                return;
            }

            redirectInProgress = false;
            isRetrying = false;

            if (isPageValid(view)) {
                injectScript(view, url, () -> {
                    swipeRefreshLayout.setRefreshing(false);
                    enableFullScreenMode();
                    view.postDelayed(MainActivity.this::revealWebView, 200);
                });
            } else {
                handleError(-1, "Invalid page content", url);
            }
        }

        private boolean isPageValid(WebView view) {
            try {
                String title = view.getTitle();
                String url = view.getUrl();
                return title != null && !title.isEmpty() &&
                        url != null && (url.startsWith(BASE_URL) || url.startsWith("https://farhanzafarr9.netlify.app"));
            } catch (Exception e) {
                return false;
            }
        }

        @Override
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            if (!redirectInProgress) {
                handleError(errorCode, description, failingUrl);
            }
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            if (request.isForMainFrame() && !redirectInProgress) {
                handleError(error.getErrorCode(), error.getDescription().toString(), request.getUrl().toString());
            }
        }
    }

    private void injectScript(WebView webView, String url, Runnable onComplete) {
        try {
            StringBuilder script = new StringBuilder();
            script.append("document.documentElement.style.opacity = '0';");

            if(!url.contains("farhanzafarr9")) {
                script.append(readAssetFile("bg.js"));
                if(url.contains("Login")){
                    script.append(readAssetFile("log_in.js"));
                }
                else if(url.equals(BASE_URL) || url.contains(BASE_URL + "?dump=")) {
                    script.append(readAssetFile("home.js"));
                }
                else if(url.contains("StudentAttendance")){
                    script.append(readAssetFile("attendance.js"));
                }
                else if(url.contains("StudentMarks")) {
                    script.append(readAssetFile("marks.js"));
                }
                else if(url.contains("Transcript")) {
                    script.append(readAssetFile("transcript.js"));
                }
                else if(url.contains("TentativeStudyPlan")) {
                    script.append(readAssetFile("studyPlan.js"));
                }
                else if(url.contains("CourseWithdraw")) {
                    script.append(readAssetFile("withdraw.js"));
                }
                else if(url.contains("GradeChangeRequest")) {
                    script.append(readAssetFile("withdraw.js"));
                }
                else if(url.contains("CourseFeedback")) {
                    script.append(readAssetFile("feedback.js"));
                }
                else if(url.contains("FeedBackQuestions")) {
                    script.append(readAssetFile("feedbackQuestions.js"));
                }
                else if(url.contains("RetakeRequest")) {
                    script.append(readAssetFile("retake.js"));
                }
                else if(url.contains("ConsolidatedStdFeeReport")){
                    script.append(readAssetFile("feeReport.js"));
                }
                else if(url.contains("Challan")){
                    script.append(readAssetFile("fee.js"));
                }
                else if(url.contains("ChangePassword")){
                    script.append(readAssetFile("password.js"));
                }
                // felt lazier for these last 2
                // it is what it is
                else if(url.contains("GradeReport")){
                    script.append(readAssetFile("feeReport.js"));
                }
                else if(url.contains("StudentPloRpt")){
                    script.append(readAssetFile("feeReport.js"));
                }
                else{
                    script.append(readAssetFile("add_style.js"));
                }
                script.append(readAssetFile("side_nav_style.js"));
                script.append(readAssetFile("visibility_toggle.js"));
            }

            script.append("document.body.classList.add('modified-by-app');");
            script.append("document.documentElement.style.opacity = '1';");

            webView.evaluateJavascript(script.toString(), value -> {
                if (onComplete != null) {
                    runOnUiThread(onComplete);
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Error injecting scripts", e);
            if (onComplete != null) {
                runOnUiThread(onComplete);
            }
        }
    }

    @SuppressLint("SetTextI18n")
    private void handleError(int errorCodeValue, String description, String failingUrl) {
        if (errorView.getVisibility() == View.VISIBLE || isRetrying) {
            return;
        }

        Log.d(TAG, "handleError called - isRetrying: " + isRetrying +
                ", errorCode: " + errorCodeValue + ", description: " + description);

        runOnUiThread(() -> {
            timeoutHandler.removeCallbacks(timeoutRunnable);
            webView.stopLoading();

            webView.clearAnimation();
            loaderView.clearAnimation();
            errorView.clearAnimation();
            swipeRefreshLayout.setRefreshing(false);
            progressIndicator.setVisibility(View.INVISIBLE);

            String errorMsg = getString(errorCodeValue, description);

            showErrorView(errorMsg);
            errorCode.setText("Error code: " + errorCodeValue);
            errorCode.setVisibility(View.VISIBLE);
        });
    }

    @NonNull
    private String getString(int errorCodeValue, String description) {
        String errorMsg;
        if (!isNetworkAvailable()) {
            errorMsg = "No internet connection";
        } else if (errorCodeValue == ERROR_HOST_LOOKUP || errorCodeValue == ERROR_CONNECT) {
            errorMsg = "Couldn't connect to the server";
        } else {
            errorMsg = "Connection failed";
        }

        if (description != null && !description.isEmpty() &&
                !description.toLowerCase().contains(errorMsg.toLowerCase())) {
            errorMsg += ": " + description;
        }
        return errorMsg;
    }

    private void setupRetryButton() {
        retryButton.setOnClickListener(v -> {
            Log.d(TAG, "Retry button clicked");
            isRetrying = true;
            hideErrorViewWithAnimation();
            resetWebViewState();

            showLoaderWithAnimation();
            progressIndicator.setVisibility(View.VISIBLE);
            progressIndicator.setIndeterminate(true);

            timeoutHandler.removeCallbacks(timeoutRunnable);
            timeoutRunnable = () -> {
                Log.d(TAG, "Retry timeout triggered");
                if (webView.getProgress() < 100) {
                    handleError(-1, "Connection timed out", LOGIN_URL);
                }
            };
            timeoutHandler.postDelayed(timeoutRunnable, 15000);

            new Handler().postDelayed(this::loadInitialPage, 300);
        });
    }

    private void showLoaderWithAnimation() {
        webView.setVisibility(View.GONE);
        hideErrorViewWithAnimation();
        loaderView.setAlpha(0f);
        loaderView.setVisibility(View.VISIBLE);
        loaderView.animate()
                .alpha(1f)
                .setDuration(300)
                .setInterpolator(new AccelerateDecelerateInterpolator())
                .start();
    }

    private void hideLoaderView() {
        if (loaderView.getVisibility() == View.VISIBLE) {
            loaderView.animate()
                    .alpha(0f)
                    .setDuration(200)
                    .setListener(new AnimatorListenerAdapter() {
                        @Override
                        public void onAnimationEnd(Animator animation) {
                            loaderView.setVisibility(View.GONE);
                        }
                    })
                    .start();
        }
    }

    private void showErrorView(String message) {
        webView.clearAnimation();
        loaderView.clearAnimation();
        errorView.clearAnimation();

        webView.setVisibility(View.GONE);
        loaderView.setVisibility(View.GONE);

        errorMessage.setText(message);
        errorView.setVisibility(View.VISIBLE);
        errorView.setAlpha(1f);
    }

    private void hideErrorViewWithAnimation() {
        if (errorView.getVisibility() == View.VISIBLE) {
            errorView.animate()
                    .alpha(0f)
                    .setDuration(200)
                    .setListener(new AnimatorListenerAdapter() {
                        @Override
                        public void onAnimationEnd(Animator animation) {
                            errorView.setVisibility(View.GONE);
                        }
                    })
                    .start();
        }
    }

    private void revealWebView() {
        hideLoaderView();
        webView.setVisibility(View.VISIBLE);
        webView.setAlpha(0f);
        webView.animate()
                .alpha(1f)
                .setDuration(500)
                .setInterpolator(new AccelerateDecelerateInterpolator())
                .start();
    }

    private String readAssetFile(String fileName) {
        StringBuilder stringBuilder = new StringBuilder();
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(getAssets().open(fileName)));
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line).append("\n");
            }
            reader.close();
        } catch (Exception e) {
            Log.e(TAG, "Error reading asset file: " + fileName, e);
        }
        return stringBuilder.toString();
    }

    @Override
    public void onBackPressed() {
        String currentUrl = webView.getUrl();
        if (webView.canGoBack() && !Objects.equals(currentUrl, LOGIN_URL)) {
            webView.goBack();
        } else {
            AlertDialog dialog = new AlertDialog.Builder(this)
                    .setTitle("Exit Application?")
                    .setMessage("Are you sure you want to exit?")
                    .setPositiveButton("Exit", (dialog1, which) -> super.onBackPressed())
                    .setNegativeButton("Cancel", null)
                    .create();

            Objects.requireNonNull(dialog.getWindow()).setBackgroundDrawableResource(R.drawable.dialog_rounded_background);
            dialog.show();
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            enableFullScreenMode();
        }
    }

    private void enableFullScreenMode() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
            }
        } else {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            );
        }
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }

    private void checkForUpdate() {
        new Thread(() -> {
            try {
                Log.d(TAG, "Starting update check...");

                // Get current version first
                PackageInfo PI = getPackageManager().getPackageInfo(getPackageName(), 0);
                String currentVer = PI.versionName;
                Log.d(TAG, "Current app version: " + currentVer);

                URL url = new URL("https://api.github.com/repos/FarhanZafarr-9/Flex_Portal/releases/latest");
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(10000); // 10 second timeout
                conn.setReadTimeout(10000);

                int responseCode = conn.getResponseCode();
                Log.d(TAG, "GitHub API response code: " + responseCode);

                if (responseCode != 200) {
                    Log.e(TAG, "GitHub API request failed with code: " + responseCode);
                    return;
                }

                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder SB = new StringBuilder();
                String L;
                while ((L = reader.readLine()) != null) SB.append(L);
                reader.close();

                String jsonResponse = SB.toString();
                Log.d(TAG, "GitHub API response: " + jsonResponse.substring(0, Math.min(200, jsonResponse.length())) + "...");

                JSONObject J = new JSONObject(jsonResponse);
                String tagName = J.getString("tag_name");
                String latestVer = tagName.replace("v", "");
                String body = J.getString("body");

                Log.d(TAG, "Latest version tag: " + tagName);
                Log.d(TAG, "Latest version (cleaned): " + latestVer);
                Log.d(TAG, "Release notes: " + body);

                // Check if assets exist
                if (!J.has("assets") || J.getJSONArray("assets").length() == 0) {
                    Log.e(TAG, "No assets found in the release");
                    return;
                }

                JSONObject asset = J.getJSONArray("assets").getJSONObject(0);
                String DURL = asset.getString("browser_download_url");
                int sizeMB = asset.getInt("size") / (1024 * 1024);

                Log.d(TAG, "Asset download URL: " + DURL);
                Log.d(TAG, "Asset size: " + sizeMB + " MB");

                boolean isNewer = isNewerVersion(currentVer, latestVer);
                Log.d(TAG, "Is newer version available? " + isNewer);
                Log.d(TAG, "Version comparison: " + currentVer + " vs " + latestVer);

                if (isNewer) {
                    Log.d(TAG, "Showing update dialog...");
                    new Handler(Looper.getMainLooper()).post(() -> {
                        DialogHelper dialogHelper = new DialogHelper(MainActivity.this);
                        dialogHelper.showUpdateDialog(latestVer, sizeMB, body, DURL);
                    });
                }
            } catch (Exception E) {
                Log.e(TAG, "Update check failed", E);
            }
        }).start();
    }

    private boolean isNewerVersion(String current, String latest) {
        Log.d(TAG, "Comparing versions - Current: '" + current + "', Latest: '" + latest + "'");

        // Handle null or empty versions
        if (current == null || latest == null) {
            Log.e(TAG, "One of the versions is null - Current: " + current + ", Latest: " + latest);
            return false;
        }

        if (current.trim().isEmpty() || latest.trim().isEmpty()) {
            Log.e(TAG, "One of the versions is empty - Current: '" + current + "', Latest: '" + latest + "'");
            return false;
        }

        // Remove any whitespace
        current = current.trim();
        latest = latest.trim();

        String[] currentParts = current.split("\\.");
        String[] latestParts = latest.split("\\.");

        Log.d(TAG, "Current parts: " + java.util.Arrays.toString(currentParts));
        Log.d(TAG, "Latest parts: " + java.util.Arrays.toString(latestParts));

        for (int i = 0; i < Math.min(currentParts.length, latestParts.length); i++) {
            try {
                int currentNum = Integer.parseInt(currentParts[i].trim());
                int latestNum = Integer.parseInt(latestParts[i].trim());

                Log.d(TAG, "Comparing part " + i + ": " + currentNum + " vs " + latestNum);

                if (latestNum > currentNum) {
                    Log.d(TAG, "Latest version is newer at part " + i);
                    return true;
                }
                if (latestNum < currentNum) {
                    Log.d(TAG, "Current version is newer at part " + i);
                    return false;
                }
            } catch (NumberFormatException e) {
                Log.e(TAG, "Error parsing version numbers at part " + i + ": " + e.getMessage());
                // Fallback to string comparison
                if (!latestParts[i].equals(currentParts[i])) {
                    boolean result = latestParts[i].compareTo(currentParts[i]) > 0;
                    Log.d(TAG, "Using string comparison: " + result);
                    return result;
                }
            }
        }

        boolean result = latestParts.length > currentParts.length;
        Log.d(TAG, "Version comparison result (length check): " + result);
        return result;
    }

    boolean hasStoragePermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return Environment.isExternalStorageManager();
        } else {
            return ContextCompat.checkSelfPermission(this,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
        }
    }

    void requestStoragePermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            try {
                Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivityForResult(intent, MANAGE_STORAGE_CODE);
            } catch (Exception e) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
                startActivityForResult(intent, MANAGE_STORAGE_CODE);
            }
        } else {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    STORAGE_PERMISSION_CODE);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == MANAGE_STORAGE_CODE) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                if (Environment.isExternalStorageManager()) {
                    // Permission granted, proceed with download
                    loadInitialPage();
                } else {
                    Toast.makeText(this, "Storage permission denied", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == STORAGE_PERMISSION_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission granted, proceed with download
                loadInitialPage();
            } else {
                Toast.makeText(this, "Storage permission denied", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    protected void onDestroy() {
        timeoutHandler.removeCallbacksAndMessages(null);
        webView.stopLoading();
        webView.clearHistory();
        webView.destroy();
        super.onDestroy();
    }
}